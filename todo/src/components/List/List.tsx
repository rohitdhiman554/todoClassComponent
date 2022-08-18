import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input/Input";
import Item from "../Item/Item";
import "./List.css";

type MyState = {
  todo: {
    text: string;
    id: string;
    done: boolean;
  }[];
  display: string;
};

type ShowArr = {
  text: string;
  id: string;
  done: boolean;
}[];

class List extends Component<{}, MyState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      todo: [],
      display: "all",
    };
  }

  handleSubmit = (data: string) => {
    let newId = uuidv4();

    this.setState((prev) => ({
      todo: [...prev.todo, { text: data, id: newId, done: false }],
    }));
  };
  handleDelete = (id: string) => {
    this.setState((prev) => ({
      todo: prev.todo.map((ele) => {
        if (ele.id === id) {
          if (ele.done == false) return { ...ele, done: true };
          else return { ...ele, done: false };
        } else {
          return ele;
        }
      }),
    }));
  };

  handleEdit = (updatedData: string, id: string) => {
    this.setState((prev) => ({
      todo: prev.todo.map((ele) => {
        if (ele.id === id) {
          return { ...ele, text: updatedData };
        } else {
          return ele;
        }
      }),
    }));
  };

  handleComplete = (id: string) => {
    this.setState((prev) => ({
      todo: prev.todo.map((ele) => {
        if (ele.id === id) {
          if (ele.done === false) return { ...ele, done: true };
          else return { ...ele, done: false };
        } else return ele;
      }),
    }));
  };

  allDone = (check: boolean) => {
    this.setState((prev) => ({
      todo: prev.todo.map((todo) => {
        if (check === false) return { ...todo, done: true };
        else if (check === true) return { ...todo, done: false };
        else return todo;
      }),
    }));
  };

  showAll = () => {
    this.setState({ display: "all" });
  };

  showActive = () => {
    this.setState({ display: "active" });
  };

  showComplete = () => {
    this.setState({ display: "complete" });
  };

  handleClear = () => {
    this.setState((prev) => ({
      todo: prev.todo.filter((ele) => ele.done === false),
    }));
  };

  render() {
    let arr: ShowArr = [];
    if (this.state.display === "all") {
      arr = this.state.todo;
    } else if (this.state.display === "active") {
      arr = this.state.todo.filter((ele) => ele.done === false);
    } else if (this.state.display === "complete")
      arr = this.state.todo.filter((ele) => ele.done === true);

    return (
      <>
        <div id="overall-div">
          <Input
            onSubmit={this.handleSubmit}
            onAllComplete={this.allDone}
          ></Input>
          {this.state.todo.length > 0 ? <hr id="first"></hr> : <></>}
          <div id="todo-div">
            {arr.map((ele) => (
              <Item
                key={ele.id}
                id={ele.id}
                done={ele.done}
                text={ele.text}
                onDelete={this.handleDelete}
                onEdit={this.handleEdit}
                onComplete={this.handleComplete}
              ></Item>
            ))}
          </div>
          {this.state.todo.length > 0 ? (
            <div id="button-div">
              <div id="remaining" className="button">
                {this.state.todo.filter((ele) => ele.done == false).length}
                Items left
              </div>

              <div id="all-div" className="button">
                <button
                  className={`${
                    this.state.display === "all" ? "clicked" : "all-button"
                  }`}
                  onClick={this.showAll}
                >
                  All
                </button>
              </div>

              <div id="active-div" className="button">
                <button
                  className={`${
                    this.state.display === "active"
                      ? "clicked"
                      : "active-button"
                  }`}
                  onClick={this.showActive}
                >
                  Active
                </button>
              </div>

              <div id="completed-div" className="button">
                <button
                  className={`${
                    this.state.display === "complete"
                      ? "clicked"
                      : "complete-button"
                  }`}
                  onClick={this.showComplete}
                >
                  Complete
                </button>
              </div>

              <div id="clear-div" className="button">
                <button id="clear-button" onClick={this.handleClear}>
                  Clear Completed Task
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  }
}

export default List;
