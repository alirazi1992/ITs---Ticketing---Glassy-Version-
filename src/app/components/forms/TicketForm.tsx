'use client';

import { useAppToast } from '@/app/hooks/useAppToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {
  TicketType,
  ticketSchemas,
  SoftwareTicketForm,
  HardwareTicketForm,
  NetworkTicketForm,
  OtherTicketForm,
} from '@/app/types/ticket';
import { ObjectSchema } from 'yup';

// Combined form types for all ticket types
type FormData =
  | SoftwareTicketForm
  | HardwareTicketForm
  | NetworkTicketForm
  | OtherTicketForm;

export default function TicketForm() {
  const [type, setType] = useState<TicketType>('software');
  const { success, error } = useAppToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(ticketSchemas[type] as ObjectSchema<FormData>),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      console.log('Form submitted:', data);
      success('تیکت با موفقیت ثبت شد');
      reset();
    } catch {
      error('خطایی در ارسال تیکت رخ داد');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>نوع تیکت:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TicketType)}
          className="block border rounded w-full p-2"
        >
          <option value="software">نرم‌افزار</option>
          <option value="hardware">سخت‌افزار</option>
          <option value="network">شبکه</option>
          <option value="other">سایر</option>
        </select>
      </div>

      <div>
        <label>عنوان:</label>
        <input {...register('title')} className="input" />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>توضیحات:</label>
        <textarea {...register('description')} className="input" />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      {type === 'software' && (
        <>
          <div>
            <label>نام نرم‌افزار:</label>
            <input {...register('softwareName')} className="input" />
            {'softwareName' in errors && <p>{errors.softwareName?.message}</p>}
          </div>
          <div>
            <label>نسخه:</label>
            <input {...register('version')} className="input" />
            {'version' in errors && <p>{errors.version?.message}</p>}
          </div>
        </>
      )}

      {type === 'hardware' && (
        <>
          <div>
            <label>نوع دستگاه:</label>
            <input {...register('deviceType')} className="input" />
            {'deviceType' in errors && <p>{errors.deviceType?.message}</p>}
          </div>
          <div>
            <label>شماره سریال:</label>
            <input {...register('serialNumber')} className="input" />
            {'serialNumber' in errors && <p>{errors.serialNumber?.message}</p>}
          </div>
        </>
      )}

      {type === 'network' && (
        <>
          <div>
            <label>IP آدرس:</label>
            <input {...register('ipAddress')} className="input" />
            {'ipAddress' in errors && <p>{errors.ipAddress?.message}</p>}
          </div>
          <div>
            <label>موقعیت:</label>
            <input {...register('location')} className="input" />
            {'location' in errors && <p>{errors.location?.message}</p>}
          </div>
        </>
      )}

      {type === 'other' && (
        <div>
          <label>اطلاعات بیشتر:</label>
          <textarea {...register('additionalInfo')} className="input" />
          {'additionalInfo' in errors && (
            <p>{errors.additionalInfo?.message}</p>
          )}
        </div>
      )}

      <button type="submit" className="btn">
        ارسال تیکت
      </button>
    </form>
  );
}
