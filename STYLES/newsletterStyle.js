import css from "styled-jsx/css";

export default css.global`

.newsletter-page{
    background-color: #36b39a;
    min-height: 100vh;
    position: relative;
}

.container-newsletter{
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 7px;
    position: relative;
    top: 5vh;
    left: 50%;
    transform: translateX(-50%);
}

.container-newsletter:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container-header{
    padding: 20px;
}

.container-header p{
    color: #7d7d7d;
    font-size: 0.9rem;
}

.container-form{
    background-color: rgb(235, 237, 240);
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    padding: 20px;
}

.container-form p{
    font-size: 0.9rem;
}


@media only screen and (min-width: 992px) {
    .newsletter-page{
        min-width: 992px;
    }

    .container-newsletter{
        background-color: white;
        width: 450px;
    }
}

@media only screen and (max-width: 992px) {
    .newsletter-page{
        max-width: 992px;
    }

    .container-newsletter{
        background-color: white;
        width: 450px;
    }
}

@media only screen and (max-width: 768px) {
    .newsletter-page{
        max-width: 768px;
    }

    .container-newsletter{
        background-color: white;
        width: 450px;
    }
}

@media only screen and (max-width: 576px) {
    .newsletter-page{
        max-width: 576px;
    }

    .container-newsletter{
        background-color: white;
        max-width: 90%;
    }

    .container-form, .container-header{
        padding: 15px;
    }
    
}
`