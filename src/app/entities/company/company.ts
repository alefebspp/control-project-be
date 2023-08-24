import { randomUUID } from 'node:crypto';

interface CompanyProps {
  name: string;
  email: string;
  logo?: string;
}

export class Company {
  private props: CompanyProps;
  private _id: string;

  constructor(props: CompanyProps) {
    this.props = props;
    this._id = randomUUID();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get logo() {
    return this.props.logo;
  }

  public set logo(logo: string) {
    this.props.logo = logo;
  }
}
