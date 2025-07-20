import * as Yup from 'yup';

export type TicketType = 'software' | 'hardware' | 'network' | 'other';
export type TicketStatus = 'pending' | 'in_progress' | 'resolved';

export interface TicketTypeMap {
  software: SoftwareTicketForm;
  hardware: HardwareTicketForm;
  network: NetworkTicketForm;
  other: OtherTicketForm;
}


// ✅ Shared base form
export interface BaseTicketForm {
  title: string;
  description: string;
}

// ✅ Specific ticket types
export interface SoftwareTicketForm extends BaseTicketForm {
  softwareName: string;
  version: string;
}

export interface HardwareTicketForm extends BaseTicketForm {
  deviceType: string;
  serialNumber: string;
}

export interface NetworkTicketForm extends BaseTicketForm {
  ipAddress: string;
  location: string;
}

export interface OtherTicketForm extends BaseTicketForm {
  additionalInfo: string;
}

// ✅ Minimal ticket for list view
export interface Ticket {
  id: string;
  title: string;
  type: TicketType;
  status: TicketStatus;
  createdAt: string;
}

// ✅ Full ticket with optional fields
export interface TicketWithNotes extends BaseTicketForm {
  id: string;
  type: TicketType;
  status: TicketStatus;
  createdAt: string;
  notes: string[];
  assignedTo?: string;

  // Optional fields by type
  softwareName?: string;
  version?: string;

  deviceType?: string;
  serialNumber?: string;

  ipAddress?: string;
  location?: string;

  additionalInfo?: string;
}

// ✅ Yup validation schemas for each type
export const ticketSchemas: Record<
  TicketType,
  | Yup.ObjectSchema<SoftwareTicketForm>
  | Yup.ObjectSchema<HardwareTicketForm>
  | Yup.ObjectSchema<NetworkTicketForm>
  | Yup.ObjectSchema<OtherTicketForm>
> = {
  software: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    softwareName: Yup.string().required('نام نرم‌افزار الزامی است'),
    version: Yup.string().required('نسخه الزامی است'),
  }) as Yup.ObjectSchema<SoftwareTicketForm>,

  hardware: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    deviceType: Yup.string().required('نوع دستگاه الزامی است'),
    serialNumber: Yup.string().required('شماره سریال الزامی است'),
  }) as Yup.ObjectSchema<HardwareTicketForm>,

  network: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    ipAddress: Yup.string().required('آی‌پی آدرس الزامی است'),
    location: Yup.string().required('موقعیت الزامی است'),
  }) as Yup.ObjectSchema<NetworkTicketForm>,

  other: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    additionalInfo: Yup.string().required('اطلاعات بیشتر الزامی است'),
  }) as Yup.ObjectSchema<OtherTicketForm>,
};
