import css from "styled-jsx/css";

export default css.global`

#container-featured-img p{
    background-position: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 200px;
    width: 100%;
    margin: 0;
    border-radius: 3px;
    border: 0.03rem solid rgb(241, 241, 241);
}

.ofX{
    overflow-x: hidden !important;
}

.wb{
    word-break: break-all;
}

.ww{
    word-wrap: break-word !important;
}

  
@media only screen and (max-width: 1200px) {
    #container-featured-img p{
        height: 150px;
        max-width: 200px;
    }
}

@media only screen and (max-width: 992px) {
    #container-featured-img p{
        height: 150px;
        max-width: 200px;
    }
}

@media only screen and (max-width: 768px) {
    #container-featured-img p{
        height: 150px;
        max-width: 200px;
    }
}

@media only screen and (max-width: 576px) {
    #container-featured-img p{
        max-height: 300px;
        max-width: 576px;
        height: 250px;
        width: 100%;
    }
    #container-featured-img {
        padding: 0 !important;
        margin: 0 !important;
    }
}

@media only screen and (min-width: 576px) {
    .container-card .row {
        padding-left: 10px !important;
    }

    .container-image{
        margin-top: 0;
    }
}
`