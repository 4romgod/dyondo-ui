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
    color: #222;
    font-family: "Open Sans";
    font-weight: 100;
    font-size: 21px;
    line-height: 2rem;
}

#blog-body * {
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
    background-color: #343a40;
    color: white;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 10px;
    font-size: small;
}


/**************** BLOG CREATE/UPDATE *****************/
@media only screen and (min-width: 992px) {}

@media only screen and (max-width: 992px) {}

@media only screen and (max-width: 768px) {

    .blog-featured-img {
        height: 350px;
    }

    .blog-create-page {
        position: relative;
    }

    p,
    li {
        font-size: 18px;
        line-height: 2rem;
    }
}

@media only screen and (max-width: 576px) {
    .blog-featured-img {
        height: 250px;
    }
}
`