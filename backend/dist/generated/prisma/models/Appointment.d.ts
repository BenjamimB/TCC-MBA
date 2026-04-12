import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AppointmentModel = runtime.Types.Result.DefaultSelection<Prisma.$AppointmentPayload>;
export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null;
    _min: AppointmentMinAggregateOutputType | null;
    _max: AppointmentMaxAggregateOutputType | null;
};
export type AppointmentMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.AppointmentStatus | null;
    serviceType: string | null;
    notes: string | null;
    externalCalendarEventId: string | null;
    idempotencyKey: string | null;
    lastRemindedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AppointmentMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    startAt: Date | null;
    endAt: Date | null;
    status: $Enums.AppointmentStatus | null;
    serviceType: string | null;
    notes: string | null;
    externalCalendarEventId: string | null;
    idempotencyKey: string | null;
    lastRemindedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AppointmentCountAggregateOutputType = {
    id: number;
    professionalId: number;
    patientId: number;
    startAt: number;
    endAt: number;
    status: number;
    serviceType: number;
    notes: number;
    externalCalendarEventId: number;
    idempotencyKey: number;
    lastRemindedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AppointmentMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    serviceType?: true;
    notes?: true;
    externalCalendarEventId?: true;
    idempotencyKey?: true;
    lastRemindedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AppointmentMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    serviceType?: true;
    notes?: true;
    externalCalendarEventId?: true;
    idempotencyKey?: true;
    lastRemindedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AppointmentCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    serviceType?: true;
    notes?: true;
    externalCalendarEventId?: true;
    idempotencyKey?: true;
    lastRemindedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AppointmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AppointmentCountAggregateInputType;
    _min?: AppointmentMinAggregateInputType;
    _max?: AppointmentMaxAggregateInputType;
};
export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
    [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAppointment[P]> : Prisma.GetScalarType<T[P], AggregateAppointment[P]>;
};
export type AppointmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithAggregationInput | Prisma.AppointmentOrderByWithAggregationInput[];
    by: Prisma.AppointmentScalarFieldEnum[] | Prisma.AppointmentScalarFieldEnum;
    having?: Prisma.AppointmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AppointmentCountAggregateInputType | true;
    _min?: AppointmentMinAggregateInputType;
    _max?: AppointmentMaxAggregateInputType;
};
export type AppointmentGroupByOutputType = {
    id: string;
    professionalId: string;
    patientId: string;
    startAt: Date;
    endAt: Date;
    status: $Enums.AppointmentStatus;
    serviceType: string;
    notes: string | null;
    externalCalendarEventId: string | null;
    idempotencyKey: string;
    lastRemindedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: AppointmentCountAggregateOutputType | null;
    _min: AppointmentMinAggregateOutputType | null;
    _max: AppointmentMaxAggregateOutputType | null;
};
export type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AppointmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AppointmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AppointmentGroupByOutputType[P]>;
}>>;
export type AppointmentWhereInput = {
    AND?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    OR?: Prisma.AppointmentWhereInput[];
    NOT?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    id?: Prisma.StringFilter<"Appointment"> | string;
    professionalId?: Prisma.StringFilter<"Appointment"> | string;
    patientId?: Prisma.StringFilter<"Appointment"> | string;
    startAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    status?: Prisma.EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFilter<"Appointment"> | string;
    notes?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    externalCalendarEventId?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    idempotencyKey?: Prisma.StringFilter<"Appointment"> | string;
    lastRemindedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
};
export type AppointmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serviceType?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalCalendarEventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    lastRemindedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
    patient?: Prisma.PatientOrderByWithRelationInput;
};
export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    idempotencyKey?: string;
    professionalId_startAt?: Prisma.AppointmentProfessionalIdStartAtCompoundUniqueInput;
    AND?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    OR?: Prisma.AppointmentWhereInput[];
    NOT?: Prisma.AppointmentWhereInput | Prisma.AppointmentWhereInput[];
    professionalId?: Prisma.StringFilter<"Appointment"> | string;
    patientId?: Prisma.StringFilter<"Appointment"> | string;
    startAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    status?: Prisma.EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFilter<"Appointment"> | string;
    notes?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    externalCalendarEventId?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    lastRemindedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
}, "id" | "idempotencyKey" | "professionalId_startAt">;
export type AppointmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serviceType?: Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalCalendarEventId?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    lastRemindedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AppointmentCountOrderByAggregateInput;
    _max?: Prisma.AppointmentMaxOrderByAggregateInput;
    _min?: Prisma.AppointmentMinOrderByAggregateInput;
};
export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.AppointmentScalarWhereWithAggregatesInput | Prisma.AppointmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.AppointmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AppointmentScalarWhereWithAggregatesInput | Prisma.AppointmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    patientId?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    startAt?: Prisma.DateTimeWithAggregatesFilter<"Appointment"> | Date | string;
    endAt?: Prisma.DateTimeWithAggregatesFilter<"Appointment"> | Date | string;
    status?: Prisma.EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    notes?: Prisma.StringNullableWithAggregatesFilter<"Appointment"> | string | null;
    externalCalendarEventId?: Prisma.StringNullableWithAggregatesFilter<"Appointment"> | string | null;
    idempotencyKey?: Prisma.StringWithAggregatesFilter<"Appointment"> | string;
    lastRemindedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Appointment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Appointment"> | Date | string;
};
export type AppointmentCreateInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutAppointmentsInput;
    patient: Prisma.PatientCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutAppointmentsNestedInput;
    patient?: Prisma.PatientUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentCreateManyInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentListRelationFilter = {
    every?: Prisma.AppointmentWhereInput;
    some?: Prisma.AppointmentWhereInput;
    none?: Prisma.AppointmentWhereInput;
};
export type AppointmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AppointmentProfessionalIdStartAtCompoundUniqueInput = {
    professionalId: string;
    startAt: Date | string;
};
export type AppointmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serviceType?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    externalCalendarEventId?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    lastRemindedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppointmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serviceType?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    externalCalendarEventId?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    lastRemindedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppointmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    serviceType?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    externalCalendarEventId?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    lastRemindedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AppointmentCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput> | Prisma.AppointmentCreateWithoutProfessionalInput[] | Prisma.AppointmentUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutProfessionalInput | Prisma.AppointmentCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AppointmentCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput> | Prisma.AppointmentCreateWithoutProfessionalInput[] | Prisma.AppointmentUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutProfessionalInput | Prisma.AppointmentCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AppointmentCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput> | Prisma.AppointmentCreateWithoutProfessionalInput[] | Prisma.AppointmentUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutProfessionalInput | Prisma.AppointmentCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AppointmentCreateManyProfessionalInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutProfessionalInput | Prisma.AppointmentUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput> | Prisma.AppointmentCreateWithoutProfessionalInput[] | Prisma.AppointmentUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutProfessionalInput | Prisma.AppointmentCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AppointmentCreateManyProfessionalInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutProfessionalInput | Prisma.AppointmentUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput> | Prisma.AppointmentCreateWithoutPatientInput[] | Prisma.AppointmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutPatientInput | Prisma.AppointmentCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.AppointmentCreateManyPatientInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput> | Prisma.AppointmentCreateWithoutPatientInput[] | Prisma.AppointmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutPatientInput | Prisma.AppointmentCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.AppointmentCreateManyPatientInputEnvelope;
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
};
export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput> | Prisma.AppointmentCreateWithoutPatientInput[] | Prisma.AppointmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutPatientInput | Prisma.AppointmentCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.AppointmentCreateManyPatientInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput | Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput> | Prisma.AppointmentCreateWithoutPatientInput[] | Prisma.AppointmentUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.AppointmentCreateOrConnectWithoutPatientInput | Prisma.AppointmentCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput | Prisma.AppointmentUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.AppointmentCreateManyPatientInputEnvelope;
    set?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    disconnect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    delete?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    connect?: Prisma.AppointmentWhereUniqueInput | Prisma.AppointmentWhereUniqueInput[];
    update?: Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput | Prisma.AppointmentUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput | Prisma.AppointmentUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
};
export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus;
};
export type AppointmentCreateWithoutProfessionalInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    patientId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput>;
};
export type AppointmentCreateManyProfessionalInputEnvelope = {
    data: Prisma.AppointmentCreateManyProfessionalInput | Prisma.AppointmentCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type AppointmentUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppointmentUpdateWithoutProfessionalInput, Prisma.AppointmentUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutProfessionalInput, Prisma.AppointmentUncheckedCreateWithoutProfessionalInput>;
};
export type AppointmentUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateWithoutProfessionalInput, Prisma.AppointmentUncheckedUpdateWithoutProfessionalInput>;
};
export type AppointmentUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.AppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyWithoutProfessionalInput>;
};
export type AppointmentScalarWhereInput = {
    AND?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
    OR?: Prisma.AppointmentScalarWhereInput[];
    NOT?: Prisma.AppointmentScalarWhereInput | Prisma.AppointmentScalarWhereInput[];
    id?: Prisma.StringFilter<"Appointment"> | string;
    professionalId?: Prisma.StringFilter<"Appointment"> | string;
    patientId?: Prisma.StringFilter<"Appointment"> | string;
    startAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    status?: Prisma.EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFilter<"Appointment"> | string;
    notes?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    externalCalendarEventId?: Prisma.StringNullableFilter<"Appointment"> | string | null;
    idempotencyKey?: Prisma.StringFilter<"Appointment"> | string;
    lastRemindedAt?: Prisma.DateTimeNullableFilter<"Appointment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Appointment"> | Date | string;
};
export type AppointmentCreateWithoutPatientInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutAppointmentsInput;
};
export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput>;
};
export type AppointmentCreateManyPatientInputEnvelope = {
    data: Prisma.AppointmentCreateManyPatientInput | Prisma.AppointmentCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.AppointmentUpdateWithoutPatientInput, Prisma.AppointmentUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.AppointmentCreateWithoutPatientInput, Prisma.AppointmentUncheckedCreateWithoutPatientInput>;
};
export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateWithoutPatientInput, Prisma.AppointmentUncheckedUpdateWithoutPatientInput>;
};
export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.AppointmentScalarWhereInput;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyWithoutPatientInput>;
};
export type AppointmentCreateManyProfessionalInput = {
    id?: string;
    patientId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentCreateManyPatientInput = {
    id?: string;
    professionalId: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: $Enums.AppointmentStatus;
    serviceType: string;
    notes?: string | null;
    externalCalendarEventId?: string | null;
    idempotencyKey: string;
    lastRemindedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AppointmentUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutAppointmentsNestedInput;
};
export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus;
    serviceType?: Prisma.StringFieldUpdateOperationsInput | string;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalCalendarEventId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.StringFieldUpdateOperationsInput | string;
    lastRemindedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AppointmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    serviceType?: boolean;
    notes?: boolean;
    externalCalendarEventId?: boolean;
    idempotencyKey?: boolean;
    lastRemindedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    serviceType?: boolean;
    notes?: boolean;
    externalCalendarEventId?: boolean;
    idempotencyKey?: boolean;
    lastRemindedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    serviceType?: boolean;
    notes?: boolean;
    externalCalendarEventId?: boolean;
    idempotencyKey?: boolean;
    lastRemindedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["appointment"]>;
export type AppointmentSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    serviceType?: boolean;
    notes?: boolean;
    externalCalendarEventId?: boolean;
    idempotencyKey?: boolean;
    lastRemindedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AppointmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "patientId" | "startAt" | "endAt" | "status" | "serviceType" | "notes" | "externalCalendarEventId" | "idempotencyKey" | "lastRemindedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>;
export type AppointmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $AppointmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Appointment";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
        patient: Prisma.$PatientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        patientId: string;
        startAt: Date;
        endAt: Date;
        status: $Enums.AppointmentStatus;
        serviceType: string;
        notes: string | null;
        externalCalendarEventId: string | null;
        idempotencyKey: string;
        lastRemindedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["appointment"]>;
    composites: {};
};
export type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AppointmentPayload, S>;
export type AppointmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AppointmentCountAggregateInputType | true;
};
export interface AppointmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Appointment'];
        meta: {
            name: 'Appointment';
        };
    };
    findUnique<T extends AppointmentFindUniqueArgs>(args: Prisma.SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AppointmentFindFirstArgs>(args?: Prisma.SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AppointmentFindManyArgs>(args?: Prisma.SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AppointmentCreateArgs>(args: Prisma.SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AppointmentCreateManyArgs>(args?: Prisma.SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AppointmentDeleteArgs>(args: Prisma.SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AppointmentUpdateArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AppointmentUpdateManyArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AppointmentUpsertArgs>(args: Prisma.SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma.Prisma__AppointmentClient<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AppointmentCountArgs>(args?: Prisma.Subset<T, AppointmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AppointmentCountAggregateOutputType> : number>;
    aggregate<T extends AppointmentAggregateArgs>(args: Prisma.Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>;
    groupBy<T extends AppointmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AppointmentGroupByArgs['orderBy'];
    } : {
        orderBy?: AppointmentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AppointmentFieldRefs;
}
export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AppointmentFieldRefs {
    readonly id: Prisma.FieldRef<"Appointment", 'String'>;
    readonly professionalId: Prisma.FieldRef<"Appointment", 'String'>;
    readonly patientId: Prisma.FieldRef<"Appointment", 'String'>;
    readonly startAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly endAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Appointment", 'AppointmentStatus'>;
    readonly serviceType: Prisma.FieldRef<"Appointment", 'String'>;
    readonly notes: Prisma.FieldRef<"Appointment", 'String'>;
    readonly externalCalendarEventId: Prisma.FieldRef<"Appointment", 'String'>;
    readonly idempotencyKey: Prisma.FieldRef<"Appointment", 'String'>;
    readonly lastRemindedAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Appointment", 'DateTime'>;
}
export type AppointmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput | Prisma.AppointmentOrderByWithRelationInput[];
    cursor?: Prisma.AppointmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AppointmentScalarFieldEnum | Prisma.AppointmentScalarFieldEnum[];
};
export type AppointmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentCreateInput, Prisma.AppointmentUncheckedCreateInput>;
};
export type AppointmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AppointmentCreateManyInput | Prisma.AppointmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AppointmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    data: Prisma.AppointmentCreateManyInput | Prisma.AppointmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AppointmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AppointmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentUpdateInput, Prisma.AppointmentUncheckedUpdateInput>;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyInput>;
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
};
export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AppointmentUpdateManyMutationInput, Prisma.AppointmentUncheckedUpdateManyInput>;
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
    include?: Prisma.AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AppointmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.AppointmentCreateInput, Prisma.AppointmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AppointmentUpdateInput, Prisma.AppointmentUncheckedUpdateInput>;
};
export type AppointmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
    where: Prisma.AppointmentWhereUniqueInput;
};
export type AppointmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
    limit?: number;
};
export type AppointmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AppointmentSelect<ExtArgs> | null;
    omit?: Prisma.AppointmentOmit<ExtArgs> | null;
    include?: Prisma.AppointmentInclude<ExtArgs> | null;
};
