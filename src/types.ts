export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
}

export interface Registration {
  id?: number;
  eventId: number;
  name: string;
  dateOfBirth: string;
  address: string;
}

export interface RegistrationWithEvent extends Registration {
  event: Event;
}
