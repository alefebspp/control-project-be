import { randomUUID } from 'crypto';

export type StatusType = 'PENDING' | 'REJECTED' | 'ACCEPTED';

interface AdjustmentProps {
  registry_id: string;
  collaborator_id: string;
  company_id: string;
  status?: StatusType;
  reason: string;
  registry_type: string;
  new_value: string;
  previous_value?: string;
  registry_location?: string;
  new_location: string;
  reviewer?: string;
  reviewer_response?: string;
}

export class Adjustment {
  private props: AdjustmentProps;
  private _id: string;

  constructor(props: AdjustmentProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get status() {
    return this.props.status;
  }

  public set status(status: StatusType) {
    this.props.status = status;
  }

  public get new_value() {
    return this.props.new_value;
  }

  public set new_value(new_value: string) {
    this.props.new_value = new_value;
  }

  public get previous_value() {
    return this.props.previous_value;
  }

  public set previous_value(previous_value: string) {
    this.props.previous_value = previous_value;
  }

  public get reason() {
    return this.props.reason;
  }

  public set reason(reason: string) {
    this.props.reason = reason;
  }

  public get registry_id() {
    return this.props.registry_id;
  }

  public set registry_id(registry_id: string) {
    this.props.registry_id = registry_id;
  }

  public get collaborator_id() {
    return this.props.collaborator_id;
  }

  public set collaborator_id(collaborator_id: string) {
    this.props.collaborator_id = collaborator_id;
  }

  public get company_id() {
    return this.props.company_id;
  }

  public set company_id(company_id: string) {
    this.props.company_id = company_id;
  }

  public get registry_type() {
    return this.props.registry_type;
  }

  public set registry_type(registry_type: string) {
    this.props.registry_type = registry_type;
  }

  public get registry_location() {
    return this.props.registry_location;
  }

  public set registry_location(registry_location: string) {
    this.props.registry_location = registry_location;
  }

  public get new_location() {
    return this.props.new_location;
  }

  public set new_location(new_location: string) {
    this.props.new_location = new_location;
  }

  public get reviewer() {
    return this.props.reviewer;
  }

  public set reviewer(reviewer: string) {
    this.props.reviewer = reviewer;
  }

  public get reviewer_response() {
    return this.props.reviewer_response;
  }

  public set reviewer_response(reviewer_response: string) {
    this.props.reviewer_response = reviewer_response;
  }
}
