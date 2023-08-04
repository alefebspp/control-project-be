import { randomUUID } from 'node:crypto';

interface CollaboratorProps {
  name: string;
  surname: string;
  password: string;
  email: string;
  shift_start: string;
  shift_end: string;
  interval_start: string;
  interval_end: string;
  avatar?: string | null;
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

  public get shift_start() {
    return this.props.shift_start;
  }

  public get interval_start() {
    return this.props.interval_start;
  }

  public get shift_end() {
    return this.props.shift_end;
  }

  public get interval_end() {
    return this.props.interval_end;
  }

  public get avatar() {
    return this.props.avatar;
  }
}
