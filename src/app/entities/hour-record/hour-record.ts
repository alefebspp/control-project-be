import { randomUUID } from 'crypto';

export type HourRecordType = 'ADDITIONAL' | 'PENDING';

interface HourRecordProps {
  collaborator_id: string;
  registry_type: string;
  seconds: number;
  type: HourRecordType;
  registry_id?: string;
}

export class HourRecord {
  private props: HourRecordProps;
  private _id: string;

  constructor(props: HourRecordProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get seconds() {
    return this.props.seconds;
  }

  public set seconds(seconds: number) {
    this.props.seconds = seconds;
  }

  public get type() {
    return this.props.type;
  }

  public set type(type: HourRecordType) {
    this.props.type = type;
  }

  public get registry_type() {
    return this.props.registry_type;
  }

  public set registry_type(registry_type: string) {
    this.props.registry_type = registry_type;
  }

  public get collaborator_id() {
    return this.props.collaborator_id;
  }

  public set collaborator_id(collaborator_id: string) {
    this.props.collaborator_id = collaborator_id;
  }

  public get registry_id() {
    return this.props.registry_id;
  }

  public set registry_id(registry_id: string) {
    this.props.registry_id = registry_id;
  }
}
