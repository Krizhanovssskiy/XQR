import React,{Fragment} from "react";
import Header           from "../../components/Header/Header";

const Main = ({children}) => (
    <Fragment>
        <Header/>
        {children}
    </Fragment>
);

export default Main;
