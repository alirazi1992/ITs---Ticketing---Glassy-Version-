import * as Yup from 'yup';
import { TicketType, TicketTypeMap } from '@/app/types/ticket';

export const ticketSchemas: {
  [K in TicketType]: Yup.ObjectSchema<TicketTypeMap[K]>;
} = {
  software: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    softwareName: Yup.string().required('نام نرم‌افزار الزامی است'),
    version: Yup.string().required('نسخه الزامی است'),
  }),
  hardware: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    deviceType: Yup.string().required('نوع دستگاه الزامی است'),
    serialNumber: Yup.string().required('شماره سریال الزامی است'),
  }),
  network: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    ipAddress: Yup.string().required('آی‌پی آدرس الزامی است'),
    location: Yup.string().required('موقعیت الزامی است'),
  }),
  other: Yup.object({
    title: Yup.string().required('عنوان الزامی است'),
    description: Yup.string().required('توضیحات الزامی است'),
    additionalInfo: Yup.string().required('اطلاعات بیشتر الزامی است'),
  }),
};
