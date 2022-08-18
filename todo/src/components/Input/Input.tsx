import React, { Component } from "react";
import "./Input.css";
import { RiArrowDropDownLine } from "react-icons/ri";

type InputProps = {
  onSubmit: (data: string) => void;
  onAllComplete: (check: boolean) => void;
};

type InputState = {
  data: string;
  check: boolean;
};

class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      data: "",
      check: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      data: e.target.value,
    });
  };

  submitTask = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && this.state.data !== "") {
      this.props.onSubmit(this.state.data);

      this.setState({ data: "" });
    }
  };
  allComplete = () => {
    if (this.state.check === false) this.setState({ check: true });
    else this.setState({ check: false });
    this.props.onAllComplete(this.state.check);
  };

  render() {
    return (
      <>
        <div id="input-div">
          <div id="icon">
            <RiArrowDropDownLine
              id="all_complete_icon"
              onClick={this.allComplete}
            />
          </div>

          <div id="inner-div">
            <input
              id="todo-input"
              type="text"
              value={this.state.data}
              placeholder="What needs to be done"
              onChange={this.handleChange}
              onKeyPress={this.submitTask}
            ></input>
          </div>
        </div>
      </>
    );
  }
}
export default Input;
