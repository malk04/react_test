import Header from "./Header";
import Footer from "./Footer";

const MainTemplate = (props) => {
    return <>
        <Header/>
        {props.children}
        <Footer/>
    </>
}

export default MainTemplate;