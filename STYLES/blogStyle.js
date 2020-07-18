import css from "styled-jsx/css";

export default css.global`
body {
    color: rgb(41, 41, 41);
}

h1,
h2,
h3,
h4 {
    font-family: sans-serif !important;
    font-weight: 500 !important;
}

strong,
b {
    font-weight: bold;
}

p,
li {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 21px;
    line-height: 2rem;
}

#blog-body a{
    color: rgb(41, 41, 41);
    text-decoration: underline;
}

#blog-body *:not(span) {
    color: rgb(41, 41, 41);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.blog-featured-img {
    background-color: #eee;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 500px;
    width: 100%;
    margin: 0;
}


/**************** CONTENT DISPLAY *****************/
#blog-body img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: auto;
}

#blog-body {
    letter-spacing: -0.003em;
}

#blog-body .ql-syntax {
    background-color: #2d2d2d;
    color: white;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 10px;
    font-size: 1rem !important;
    font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    overflow-x: scroll;
}

#blog-body iframe {
    width: 100%;
    height: 400px
}


/**************** BLOG CREATE/UPDATE *****************/
@media only screen and (min-width: 992px) {}

@media only screen and (max-width: 992px) {}

@media only screen and (max-width: 768px) {

    .blog-featured-img {
        height: 350px;
    }

    #blog-body iframe {
        height: 350px
    }

    .blog-create-page {
        position: relative;
    }

    p,
    li {
        font-size: 19px !important;
        line-height: 1.7rem !important;
    }

    #blog-body .ql-syntax {
        font-size: 0.8rem !important;
    }
}

@media only screen and (max-width: 576px) {
    .blog-featured-img {
        height: 250px;
    }

    #blog-body iframe {
        height: 200px
    }
}
`