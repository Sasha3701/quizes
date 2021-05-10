import React from "react";
import classes from "./QuizeCreator.css";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Select from "../../Components/UI/Select/Select";
import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../store/actions/create";

function createOptionControl(number) {
  return {
    value: "",
    label: `Вариант ${number}`,
    id: number,
    errorMessage: "Значение не может быть пустым",
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  };
}

function createFormControls() {
  return {
    question: {
      value: "",
      label: "Введите вопрос",
      errorMessage: "Вопрос не может быть пустым",
      valid: false,
      touched: false,
      validation: {
        required: true,
      },
    },
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizeCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {
    const questionItem = {
      id: this.props.quize.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      question: this.state.formControls.question.value,
      answers: [
        {
          text: this.state.formControls.option1.value,
          id: this.state.formControls.option1.id,
        },
        {
          text: this.state.formControls.option2.value,
          id: this.state.formControls.option2.id,
        },
        {
          text: this.state.formControls.option3.value,
          id: this.state.formControls.option3.id,
        },
        {
          text: this.state.formControls.option4.value,
          id: this.state.formControls.option4.id,
        },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizeHandler = (event) => {
    event.preventDefault();
    // axios
    //   .post(
    //     "https://quize-6144f-default-rtdb.firebaseio.com/quizes.json",
    //     this.state.quize
    //   )
    //   .then(() => {
    //     this.setState({
    //       quize: [],
    //       isFormValid: false,
    //       rightAnswerId: 1,
    //       formControls: createFormControls(),
    //     })
    //   })
    //   .catch((error) => console.log(error));
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
    this.props.finishCreateQuiz();
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    return isValid;
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            value={control.value}
            label={control.label}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            onChange={(event) =>
              this.onChangeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  render() {
    return (
      <div className={classes.QuizeCreator}>
        <div>
          <h1>Создать тест</h1>
          <form
            onSubmit={this.submitHandler}
            className={classes.QuizeCreatorForm}
          >
            {this.renderControls()}
            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            />
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizeHandler}
              disabled={this.props.quize.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quize: state.create.quize,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizeCreator);
