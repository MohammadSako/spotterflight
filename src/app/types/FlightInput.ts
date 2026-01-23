import { ChangeEvent } from "react";

export interface FlightInputProps {
  value: string;
  handle: (e: ChangeEvent<HTMLInputElement>) => void;
  data: {
    code: string;
    city: string;
    country: string;
    airport: string;
    key: string;
  }[];
  onSelect: (airport: {
    code: string;
    city: string;
    country: string;
    airport: string;
    key: string;
  }) => void;
  placeholder: string;
  variant: string;
}
