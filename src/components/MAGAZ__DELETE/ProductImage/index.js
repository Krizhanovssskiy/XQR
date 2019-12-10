import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import {formatMoney} from "../../pipes/priceFormatter";
// import {cumulativeOffSet} from "../../../utilities/cumulativeOffset";

import './Product.scss';
import SlideDots from "../SlideDots/SlideDots";

const cumulativeOffSet = (element) => {
    let top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

const ProductImage = (props) => {

  const {
      title,
      price,
      images,
      description,
      id,
  } = props.product;

  const imageRef = React.createRef();
  const [img, setImg] = useState(images[0]);
  const [aItem, setAItem] = useState(0);

  /*
    данная функция включается по событию - onMouseMove
    e.type - от мыши и есть - onMouseMove
    e.clientX - свойство является горизонтальной координатой в пределах
    клиентской области приложения
    imageRef.current - ссылка на конкретный ДОМ элемент:
    <img class="card-img-top product__img" src="..." alt="First title" style="width: 90%; height: 50%;">

    cumulativeOffSet(imageRef.current) - вычисляет отступ от левого края экрана и от верха
    вызов функции возвращает объект с двумя свойствами left и top
    cumulativeOffSet(imageRef.current).left

    const currentX = координата мышки на экране - отступ от левого края ДОМ элемента <img />
    получается что это координата перемещения мышки по ДОМ жлементу <img />

    const part
  */
  const handleImageChange = (e) => {

      let clientX;

      if(e.type === 'touchmove') {
          clientX = e.touches[0].clientX;
      } else {
          clientX = e.clientX;
      }

      // console.log(  cumulativeOffSet(imageRef.current).left );
      // console.log(  cumulativeOffSet(imageRef.current).top );
      // console.log( imageRef.current );

      const currentX = clientX - cumulativeOffSet(imageRef.current).left;

      // console.dir(currentX);

      // ширина картинки деленная на количество картинок для данного товара...
      const part = imageRef.current.clientWidth / images.length;
      // console.log(Math.ceil(currentX / part) - 1);

      // console.log( imageRef.current.clientWidth );

      // координация движения мышки деленная на элемент...
      let imgIndex = Math.ceil(currentX / part) - 1;
      if (imgIndex < 0) {
          imgIndex = 0;
      }
      // console.log( imgIndex );

      if (imgIndex >= images.length) {
          imgIndex = images.length - 1;
      }
      setAItem(imgIndex);
      setImg(images[imgIndex]);
  };

  const handleMouseOut = (e) => {
      setImg(images[0]);
      setAItem(0);
  };

  const changeImage = (i) => {
      setImg(images[i]);
      setAItem(i);
  }


  return(
    <Link to={`/products/${id}`} className="product__link">
        <img
          style={{width: '50%', height: '50%'}}
          onMouseMove={handleImageChange}
          onMouseOut={handleMouseOut}
          onTouchMove={handleImageChange}
          onTouchEnd={handleMouseOut}
          className="card-img-top product__img"
          src={img} alt={title}
          ref={imageRef}
        />
        <SlideDots len={images.length} activeItem={aItem} changeItem={changeImage}/>
        {/*
        <img style={{width: '50%', height: '50%'}} className="card-img-top product__img" src="https://productimages.hepsiburada.net/s/18/280-413/9801258663986.jpg?v1" alt="" />
        */}
    </Link>
  );
}




export default ProductImage;
