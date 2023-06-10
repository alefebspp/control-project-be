import { randomUUID } from 'crypto';

interface RegistryProps {
  date: Date;
  start?: string;
  start_location?: string;
  interval_start?: string;
  interval_start_location?: string;
  interval_end?: string;
  interval_end_location?: string;
  end?: string;
  end_location?: string;
  collaborator_id: string;
}

export class Registry {
  private props: RegistryProps;
  private _id: string;

  constructor(props: RegistryProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get collaborator_id() {
    return this.props.collaborator_id;
  }

  public set collaborator_id(collaborator_id: string) {
    this.props.collaborator_id = collaborator_id;
  }

  public get date() {
    return this.props.date;
  }

  public set date(date: Date) {
    this.props.date = date;
  }

  public get start() {
    return this.props.start;
  }

  public set start(start: string) {
    this.props.start = start;
  }

  public get start_location() {
    return this.props.start_location;
  }

  public set start_location(start_location: string) {
    this.props.start_location = start_location;
  }

  public get interval_start() {
    return this.props.interval_start;
  }

  public set interval_start(interval_start: string) {
    this.props.interval_start = interval_start;
  }

  public get interval_start_location() {
    return this.props.interval_start_location;
  }

  public set interval_start_location(interval_start_location: string) {
    this.props.interval_start_location = interval_start_location;
  }

  public get interval_end() {
    return this.props.interval_end;
  }

  public set interval_end(interval_end: string) {
    this.props.interval_end = interval_end;
  }

  public get interval_end_location() {
    return this.props.interval_end_location;
  }

  public set interval_end_location(interval_end_location: string) {
    this.props.interval_end_location = interval_end_location;
  }

  public get end() {
    return this.props.end;
  }

  public set end(end: string) {
    this.props.end = end;
  }

  public get end_location() {
    return this.props.end_location;
  }

  public set end_location(end_location: string) {
    this.props.end_location = end_location;
  }
}
