import Button from "../UI/Button/Button";
import classes from "./FinishedQuize.css";
import { Link } from "react-router-dom";

const FinishedQuize = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuize}>
      <ul>
        {props.quize.map((quize, index) => {
          const cls = [
            "fa",
            props.results[quize.id] === "success" ? "fa-check" : "fa-times",
            classes[props.results[quize.id]],
          ];

          return (
            <li key={index}>
              <strong>{quize.id}.</strong>&nbsp;
              {quize.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quize.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuize;
