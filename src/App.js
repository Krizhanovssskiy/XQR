import './scss/base.scss'
import './components/style.scss'

import React, {Component}       from 'react';
import Routing                  from "./Routing";
import {withRouter}             from 'react-router-dom';
import {connect}                from 'react-redux';
import ru_json                  from "./_src/lib/language/ru";
import en_json                  from "./_src/lib/language/en";
import uk_json                  from "./_src/lib/language/uk";
import {define_language}        from "./_src/lib/helpers";
import {lang_init, setHostName} from "./_actions";
import i18next                  from 'i18next';
import propTypes                from "prop-types";
import {parseHost}              from './_src/lib/helpers'

/**
 * Временный вариант, пока нету сабдоменов
 */
const redirect = () => {
    const object_host = parseHost();
    if (object_host) {
        const url = `${object_host.protocol}//${object_host.host}/user/${object_host.subdomain}`;
        window.location.replace(url);
    }
};
redirect();

class App extends Component {
    static propTypes = {
        lang_init: propTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.setLanguage(define_language());
    }

    setLanguage = language => {
        const {lang_init} = this.props;
        let resources = "";
        switch (language) {
            case 'en':
                resources = en_json;
                break;
            case 'uk':
                resources = uk_json;
                break;
            default:
                resources = ru_json;
        }
        i18next.init({
            lng: language,
            resources
        });
        lang_init(i18next.language);
    };


    render() {
        return (
            <div className="App">
                <Routing/>
            </div>
        )
    }
}

export default connect(
    null,
    {lang_init, setHostName}
)(withRouter(App));

