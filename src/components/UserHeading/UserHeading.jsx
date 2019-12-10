import './style.scss';
import sprite from '../../img/sprite.svg';

import React, {useState, useRef} from 'react';
import {connect}                 from 'react-redux';
import loadImage                 from 'blueimp-load-image';

import {uploadUserProfileImage} from '../../_src/lib/api';
import {createVideo, hidePopup} from '../../_actions';
import QrCode                   from './QrCode';
import VideoPlayer              from './VideoPlayer';
import FileUpload               from './FileUpload';
import MediaPreview             from './MediaPreview';
import TrainingWindows          from '../TrainingWindows';

const UserHeading = ({
                         auth,
                         profile,
                         popupToShow,
                         createVideo,
                         uploadUserProfileImage,
                         hidePopup,
                         isChangePage,
                         videos
                     }) => {
    const {api_token} = auth.user;
    const [inputs, setInputs] = useState({
        image:           '',
        imagePreviewUrl: '',
        video:           '',
        videoPreviewUrl: ''
    });
    const [isPlaying, setIsPlaying] = useState(null);

    const videoRef = useRef(null);
    const videoImputRef = useRef(null);
    const imageImputRef = useRef(null);

    const onFirePause = () => {
        setIsPlaying(false);
    };
    const onFirePlay = () => {
        setIsPlaying(true);
    };
    const onVideoClick = () => {
        if (!videos.length) return;
        if (!isPlaying) {
            videoRef.current.play();
        } else if (isPlaying) {
            videoRef.current.pause();
        }
    };
    const onFileSubmit = () => {
        hidePopup();
        if (inputs.video) {
            const formData = new FormData();
            formData.append('video', inputs.video);
            formData.append('profile_id', profile.id);
            formData.append('name', 'my video');
            formData.append('is_main', 1);
            createVideo({api_token, alias: auth.user.alias, formData});
        } else if (inputs.image) {
            const formData = new FormData();
            formData.append('image', inputs.image);
            formData.append('is_main', 1);
            uploadUserProfileImage({api_token, alias: auth.user.alias, formData});
        }
    };
    const onInputChange = e => {
        if (e) {
            e.preventDefault();
            e.persist();
        }
        const file = e.target.files[0];
        setInputs(inputs => ( {
            ...inputs,
            [e.target.name]: file
        } ));

        if (file && file.type.match('image')) {
            if (file.size > 10000000) {
                alert('Файл превышает 10МБ');
                return;
            }

            const loadingImageOO = loadImage(file, img => {
                img.className = 'MediaPreview__image';
                console.log(img)
                setInputs(inputs => ( {
                    ...inputs,
                    imagePreviewUrl: img
                } ));
            });

            // const fileReader = new FileReader();
            // fileReader.onloadend = e => {
            //   setInputs(inputs => ({
            //     ...inputs,
            //     imagePreviewUrl: fileReader.result
            //   }));
            // };
            // fileReader.readAsDataURL(file);

            //
        } else if (file && file.type.match('video')) {
            if (file.size > 30000000) {
                alert('Файл превышает 30МБ');
                return;
            }
            const fileReader = new FileReader();
            fileReader.onloadend = e => {
                setInputs(inputs => ( {
                    ...inputs,
                    videoPreviewUrl: fileReader.result
                } ));
            };
            fileReader.readAsDataURL(file);
        }
    };
    const onFileCancel = () => {
        hidePopup();
        setInputs(inputs => ( {
            ...inputs,
            imagePreviewUrl: '',
            videoPreviewUrl: ''
        } ));
        videoImputRef.current.value = null;
        imageImputRef.current.value = null;
    };

    return (
        <section className="UserHeading">
            <div className="UserHeading__container">
                <VideoPlayer
                    onVideoClick={onVideoClick}
                    videoRef={videoRef}
                    onFirePause={onFirePause}
                    onFirePlay={onFirePlay}
                />
            </div>

            <TrainingWindows/>
            {!isPlaying && !!videos.length && (
                <div onClick={onVideoClick} className="UserHeading__icon-box">
                    <svg className="UserHeading__icon--triangle">
                        <use xlinkHref={`${sprite}#icon-triangle`}/>
                    </svg>
                </div>
            )}
            {isChangePage && (
                <FileUpload
                    isPlaying={isPlaying}
                    onInputChange={onInputChange}
                    onFileSubmit={onFileSubmit}
                    videoRef={videoRef}
                    onVideoClick={onVideoClick}
                    videoImputRef={videoImputRef}
                    imageImputRef={imageImputRef}
                />
            )}

            <QrCode/>
            {popupToShow === 'FileUpload' &&
            ( inputs.imagePreviewUrl || inputs.videoPreviewUrl ) && (
                <MediaPreview
                    imagePreviewUrl={inputs.imagePreviewUrl}
                    videoPreviewUrl={inputs.videoPreviewUrl}
                    onFileCancel={onFileCancel}
                    onFileSubmit={onFileSubmit}
                />
            )}
        </section>
    );
};

//ПРОПТАЙПС?????
const mapStateToProps = ({
                             auth,
                             profile,
                             popupToShow,
                             isChangePage,
                             videos
                         }) => ( {
    auth,
    profile,
    popupToShow,
    isChangePage,
    videos
} );

export default connect(
    mapStateToProps,
    {
        createVideo,
        uploadUserProfileImage,
        hidePopup
    }
)(UserHeading);
