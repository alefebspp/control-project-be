import { randomUUID } from 'node:crypto';

interface CollaboratorProps {
  name: string;
  surname: string;
  password: string;
  email: string;
  shift_start: Date;
  shift_end: Date;
}

export class Collaborator {
  private props: CollaboratorProps;
  private _id: string;

  constructor(props: CollaboratorProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public get surname() {
    return this.props.surname;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get shiftStart() {
    return this.props.shift_start;
  }

  public get shiftEnd() {
    return this.props.shift_end;
  }
}
