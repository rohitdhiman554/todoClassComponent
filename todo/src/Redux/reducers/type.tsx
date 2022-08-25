export interface GlobalState {
  todo: {
    text: string;
    id: string;
    done: boolean;
  }[];
  display: string;
}

interface SubmitState {
  type: "SUBMIT";
  payload: {
    data: string;
  };
}
interface DeleteState {
  type: "DELETE";
  payload: {
    id: string;
  };
}

interface EditState {
  type: "EDIT";
  payload: {
    data: string;
    id: string;
  };
}

interface CompleteState {
  type: "COMPLETE_TASK";
  payload: {
    id: string;
  };
}

interface allDone {
  type: "ALL_DONE";
  payload: {
    check: boolean;
  };
}

interface ShowState {
  type: "SHOW";
  payload: {
    display: string;
  };
}

interface ShowActive {
  type: "ACTIVE";
  payload: {
    display: string;
  };
}

interface ShowComplete {
  type: "COMPLETE";
  payload: {
    display: string;
  };
}

interface ClearState {
  type: "CLEAR";
}

export type ActionState =
  | SubmitState
  | DeleteState
  | EditState
  | CompleteState
  | allDone
  | ShowState
  | ShowActive
  | ShowComplete
  | ClearState;
