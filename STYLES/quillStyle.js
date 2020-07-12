import css from "styled-jsx/css";
export default css.global`
.ql-editor{
    height: 400px !important;
    overflow-y: scroll;
    overflow-x: scroll;
}

.ql-syntax{
    counter-reset: line;
    font-size: 1rem;
}

.ql-syntax p:before {
    counter-increment: line;
    content: counter(line);
    display: inline-block;
    border-right: 1px solid #ddd;
    padding: 0 .5em;
    margin-right: .5em;
    color: #888
  }
`