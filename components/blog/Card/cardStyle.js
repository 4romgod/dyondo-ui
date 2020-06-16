import css from "styled-jsx/css";

export default css.global`

#container-featured-img p{
    background-position: center;
    background-size: cover;
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

  
@media only screen and (max-width: 768px) {
}

@media only screen and (max-width: 576px) {
    .container-featured-img {
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