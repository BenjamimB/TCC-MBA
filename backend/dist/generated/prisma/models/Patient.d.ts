import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PatientModel = runtime.Types.Result.DefaultSelection<Prisma.$PatientPayload>;
export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
export type PatientMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    phoneNumber: string | null;
    name: string | null;
    dateOfBirth: Date | null;
    consentRecordedAt: Date | null;
    anonymizedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    phoneNumber: string | null;
    name: string | null;
    dateOfBirth: Date | null;
    consentRecordedAt: Date | null;
    anonymizedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PatientCountAggregateOutputType = {
    id: number;
    professionalId: number;
    phoneNumber: number;
    name: number;
    dateOfBirth: number;
    consentRecordedAt: number;
    anonymizedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PatientMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    phoneNumber?: true;
    name?: true;
    dateOfBirth?: true;
    consentRecordedAt?: true;
    anonymizedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    phoneNumber?: true;
    name?: true;
    dateOfBirth?: true;
    consentRecordedAt?: true;
    anonymizedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PatientCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    phoneNumber?: true;
    name?: true;
    dateOfBirth?: true;
    consentRecordedAt?: true;
    anonymizedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PatientAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    cursor?: Prisma.PatientWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PatientCountAggregateInputType;
    _min?: PatientMinAggregateInputType;
    _max?: PatientMaxAggregateInputType;
};
export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
    [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePatient[P]> : Prisma.GetScalarType<T[P], AggregatePatient[P]>;
};
export type PatientGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithAggregationInput | Prisma.PatientOrderByWithAggregationInput[];
    by: Prisma.PatientScalarFieldEnum[] | Prisma.PatientScalarFieldEnum;
    having?: Prisma.PatientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PatientCountAggregateInputType | true;
    _min?: PatientMinAggregateInputType;
    _max?: PatientMaxAggregateInputType;
};
export type PatientGroupByOutputType = {
    id: string;
    professionalId: string;
    phoneNumber: string;
    name: string | null;
    dateOfBirth: Date | null;
    consentRecordedAt: Date | null;
    anonymizedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PatientCountAggregateOutputType | null;
    _min: PatientMinAggregateOutputType | null;
    _max: PatientMaxAggregateOutputType | null;
};
export type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PatientGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PatientGroupByOutputType[P]>;
}>>;
export type PatientWhereInput = {
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    id?: Prisma.StringFilter<"Patient"> | string;
    professionalId?: Prisma.StringFilter<"Patient"> | string;
    phoneNumber?: Prisma.StringFilter<"Patient"> | string;
    name?: Prisma.StringNullableFilter<"Patient"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    consentRecordedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    anonymizedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    appointments?: Prisma.AppointmentListRelationFilter;
    waitlistEntries?: Prisma.WaitlistEntryListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    interactionRecords?: Prisma.InteractionRecordListRelationFilter;
};
export type PatientOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    consentRecordedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    anonymizedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
    appointments?: Prisma.AppointmentOrderByRelationAggregateInput;
    waitlistEntries?: Prisma.WaitlistEntryOrderByRelationAggregateInput;
    conversations?: Prisma.ConversationOrderByRelationAggregateInput;
    interactionRecords?: Prisma.InteractionRecordOrderByRelationAggregateInput;
};
export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    professionalId_phoneNumber?: Prisma.PatientProfessionalIdPhoneNumberCompoundUniqueInput;
    AND?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    OR?: Prisma.PatientWhereInput[];
    NOT?: Prisma.PatientWhereInput | Prisma.PatientWhereInput[];
    professionalId?: Prisma.StringFilter<"Patient"> | string;
    phoneNumber?: Prisma.StringFilter<"Patient"> | string;
    name?: Prisma.StringNullableFilter<"Patient"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    consentRecordedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    anonymizedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    appointments?: Prisma.AppointmentListRelationFilter;
    waitlistEntries?: Prisma.WaitlistEntryListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    interactionRecords?: Prisma.InteractionRecordListRelationFilter;
}, "id" | "professionalId_phoneNumber">;
export type PatientOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrderInput | Prisma.SortOrder;
    consentRecordedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    anonymizedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PatientCountOrderByAggregateInput;
    _max?: Prisma.PatientMaxOrderByAggregateInput;
    _min?: Prisma.PatientMinOrderByAggregateInput;
};
export type PatientScalarWhereWithAggregatesInput = {
    AND?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    OR?: Prisma.PatientScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PatientScalarWhereWithAggregatesInput | Prisma.PatientScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    phoneNumber?: Prisma.StringWithAggregatesFilter<"Patient"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"Patient"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null;
    consentRecordedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null;
    anonymizedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Patient"> | Date | string;
};
export type PatientCreateInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutPatientsInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutPatientsNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateManyInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientListRelationFilter = {
    every?: Prisma.PatientWhereInput;
    some?: Prisma.PatientWhereInput;
    none?: Prisma.PatientWhereInput;
};
export type PatientOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PatientProfessionalIdPhoneNumberCompoundUniqueInput = {
    professionalId: string;
    phoneNumber: string;
};
export type PatientCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    consentRecordedAt?: Prisma.SortOrder;
    anonymizedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    consentRecordedAt?: Prisma.SortOrder;
    anonymizedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    dateOfBirth?: Prisma.SortOrder;
    consentRecordedAt?: Prisma.SortOrder;
    anonymizedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PatientScalarRelationFilter = {
    is?: Prisma.PatientWhereInput;
    isNot?: Prisma.PatientWhereInput;
};
export type PatientCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput> | Prisma.PatientCreateWithoutProfessionalInput[] | Prisma.PatientUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutProfessionalInput | Prisma.PatientCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.PatientCreateManyProfessionalInputEnvelope;
    connect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
};
export type PatientUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput> | Prisma.PatientCreateWithoutProfessionalInput[] | Prisma.PatientUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutProfessionalInput | Prisma.PatientCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.PatientCreateManyProfessionalInputEnvelope;
    connect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
};
export type PatientUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput> | Prisma.PatientCreateWithoutProfessionalInput[] | Prisma.PatientUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutProfessionalInput | Prisma.PatientCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.PatientUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.PatientUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.PatientCreateManyProfessionalInputEnvelope;
    set?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    disconnect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    delete?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    connect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    update?: Prisma.PatientUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.PatientUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.PatientUpdateManyWithWhereWithoutProfessionalInput | Prisma.PatientUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.PatientScalarWhereInput | Prisma.PatientScalarWhereInput[];
};
export type PatientUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput> | Prisma.PatientCreateWithoutProfessionalInput[] | Prisma.PatientUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutProfessionalInput | Prisma.PatientCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.PatientUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.PatientUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.PatientCreateManyProfessionalInputEnvelope;
    set?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    disconnect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    delete?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    connect?: Prisma.PatientWhereUniqueInput | Prisma.PatientWhereUniqueInput[];
    update?: Prisma.PatientUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.PatientUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.PatientUpdateManyWithWhereWithoutProfessionalInput | Prisma.PatientUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.PatientScalarWhereInput | Prisma.PatientScalarWhereInput[];
};
export type PatientCreateNestedOneWithoutAppointmentsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAppointmentsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutAppointmentsInput;
    upsert?: Prisma.PatientUpsertWithoutAppointmentsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutAppointmentsInput, Prisma.PatientUpdateWithoutAppointmentsInput>, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
};
export type PatientCreateNestedOneWithoutWaitlistEntriesInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedCreateWithoutWaitlistEntriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutWaitlistEntriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutWaitlistEntriesNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedCreateWithoutWaitlistEntriesInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutWaitlistEntriesInput;
    upsert?: Prisma.PatientUpsertWithoutWaitlistEntriesInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutWaitlistEntriesInput, Prisma.PatientUpdateWithoutWaitlistEntriesInput>, Prisma.PatientUncheckedUpdateWithoutWaitlistEntriesInput>;
};
export type PatientCreateNestedOneWithoutConversationsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutConversationsInput, Prisma.PatientUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutConversationsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutConversationsInput, Prisma.PatientUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutConversationsInput;
    upsert?: Prisma.PatientUpsertWithoutConversationsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutConversationsInput, Prisma.PatientUpdateWithoutConversationsInput>, Prisma.PatientUncheckedUpdateWithoutConversationsInput>;
};
export type PatientCreateNestedOneWithoutInteractionRecordsInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutInteractionRecordsInput, Prisma.PatientUncheckedCreateWithoutInteractionRecordsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutInteractionRecordsInput;
    connect?: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateOneRequiredWithoutInteractionRecordsNestedInput = {
    create?: Prisma.XOR<Prisma.PatientCreateWithoutInteractionRecordsInput, Prisma.PatientUncheckedCreateWithoutInteractionRecordsInput>;
    connectOrCreate?: Prisma.PatientCreateOrConnectWithoutInteractionRecordsInput;
    upsert?: Prisma.PatientUpsertWithoutInteractionRecordsInput;
    connect?: Prisma.PatientWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PatientUpdateToOneWithWhereWithoutInteractionRecordsInput, Prisma.PatientUpdateWithoutInteractionRecordsInput>, Prisma.PatientUncheckedUpdateWithoutInteractionRecordsInput>;
};
export type PatientCreateWithoutProfessionalInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput>;
};
export type PatientCreateManyProfessionalInputEnvelope = {
    data: Prisma.PatientCreateManyProfessionalInput | Prisma.PatientCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type PatientUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.PatientWhereUniqueInput;
    update: Prisma.XOR<Prisma.PatientUpdateWithoutProfessionalInput, Prisma.PatientUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutProfessionalInput, Prisma.PatientUncheckedCreateWithoutProfessionalInput>;
};
export type PatientUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.PatientWhereUniqueInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutProfessionalInput, Prisma.PatientUncheckedUpdateWithoutProfessionalInput>;
};
export type PatientUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.PatientScalarWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyWithoutProfessionalInput>;
};
export type PatientScalarWhereInput = {
    AND?: Prisma.PatientScalarWhereInput | Prisma.PatientScalarWhereInput[];
    OR?: Prisma.PatientScalarWhereInput[];
    NOT?: Prisma.PatientScalarWhereInput | Prisma.PatientScalarWhereInput[];
    id?: Prisma.StringFilter<"Patient"> | string;
    professionalId?: Prisma.StringFilter<"Patient"> | string;
    phoneNumber?: Prisma.StringFilter<"Patient"> | string;
    name?: Prisma.StringNullableFilter<"Patient"> | string | null;
    dateOfBirth?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    consentRecordedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    anonymizedAt?: Prisma.DateTimeNullableFilter<"Patient"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Patient"> | Date | string;
};
export type PatientCreateWithoutAppointmentsInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutPatientsInput;
    waitlistEntries?: Prisma.WaitlistEntryCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutAppointmentsInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutAppointmentsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
};
export type PatientUpsertWithoutAppointmentsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutAppointmentsInput, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutAppointmentsInput, Prisma.PatientUncheckedCreateWithoutAppointmentsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutAppointmentsInput, Prisma.PatientUncheckedUpdateWithoutAppointmentsInput>;
};
export type PatientUpdateWithoutAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutPatientsNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutAppointmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutWaitlistEntriesInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutPatientsInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutWaitlistEntriesInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutWaitlistEntriesInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedCreateWithoutWaitlistEntriesInput>;
};
export type PatientUpsertWithoutWaitlistEntriesInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedUpdateWithoutWaitlistEntriesInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedCreateWithoutWaitlistEntriesInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutWaitlistEntriesInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutWaitlistEntriesInput, Prisma.PatientUncheckedUpdateWithoutWaitlistEntriesInput>;
};
export type PatientUpdateWithoutWaitlistEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutPatientsNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutWaitlistEntriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutConversationsInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutPatientsInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutConversationsInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutConversationsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutConversationsInput, Prisma.PatientUncheckedCreateWithoutConversationsInput>;
};
export type PatientUpsertWithoutConversationsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutConversationsInput, Prisma.PatientUncheckedUpdateWithoutConversationsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutConversationsInput, Prisma.PatientUncheckedCreateWithoutConversationsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutConversationsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutConversationsInput, Prisma.PatientUncheckedUpdateWithoutConversationsInput>;
};
export type PatientUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutPatientsNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateWithoutInteractionRecordsInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutPatientsInput;
    appointments?: Prisma.AppointmentCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutPatientInput;
};
export type PatientUncheckedCreateWithoutInteractionRecordsInput = {
    id?: string;
    professionalId: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    appointments?: Prisma.AppointmentUncheckedCreateNestedManyWithoutPatientInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutPatientInput;
};
export type PatientCreateOrConnectWithoutInteractionRecordsInput = {
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateWithoutInteractionRecordsInput, Prisma.PatientUncheckedCreateWithoutInteractionRecordsInput>;
};
export type PatientUpsertWithoutInteractionRecordsInput = {
    update: Prisma.XOR<Prisma.PatientUpdateWithoutInteractionRecordsInput, Prisma.PatientUncheckedUpdateWithoutInteractionRecordsInput>;
    create: Prisma.XOR<Prisma.PatientCreateWithoutInteractionRecordsInput, Prisma.PatientUncheckedCreateWithoutInteractionRecordsInput>;
    where?: Prisma.PatientWhereInput;
};
export type PatientUpdateToOneWithWhereWithoutInteractionRecordsInput = {
    where?: Prisma.PatientWhereInput;
    data: Prisma.XOR<Prisma.PatientUpdateWithoutInteractionRecordsInput, Prisma.PatientUncheckedUpdateWithoutInteractionRecordsInput>;
};
export type PatientUpdateWithoutInteractionRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutPatientsNestedInput;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutInteractionRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientCreateManyProfessionalInput = {
    id?: string;
    phoneNumber: string;
    name?: string | null;
    dateOfBirth?: Date | string | null;
    consentRecordedAt?: Date | string | null;
    anonymizedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PatientUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    appointments?: Prisma.AppointmentUncheckedUpdateManyWithoutPatientNestedInput;
    waitlistEntries?: Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutPatientNestedInput;
    interactionRecords?: Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput;
};
export type PatientUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    phoneNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    dateOfBirth?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    consentRecordedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anonymizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PatientCountOutputType = {
    appointments: number;
    waitlistEntries: number;
    conversations: number;
    interactionRecords: number;
};
export type PatientCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    appointments?: boolean | PatientCountOutputTypeCountAppointmentsArgs;
    waitlistEntries?: boolean | PatientCountOutputTypeCountWaitlistEntriesArgs;
    conversations?: boolean | PatientCountOutputTypeCountConversationsArgs;
    interactionRecords?: boolean | PatientCountOutputTypeCountInteractionRecordsArgs;
};
export type PatientCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientCountOutputTypeSelect<ExtArgs> | null;
};
export type PatientCountOutputTypeCountAppointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AppointmentWhereInput;
};
export type PatientCountOutputTypeCountWaitlistEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WaitlistEntryWhereInput;
};
export type PatientCountOutputTypeCountConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
export type PatientCountOutputTypeCountInteractionRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InteractionRecordWhereInput;
};
export type PatientSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    phoneNumber?: boolean;
    name?: boolean;
    dateOfBirth?: boolean;
    consentRecordedAt?: boolean;
    anonymizedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    appointments?: boolean | Prisma.Patient$appointmentsArgs<ExtArgs>;
    waitlistEntries?: boolean | Prisma.Patient$waitlistEntriesArgs<ExtArgs>;
    conversations?: boolean | Prisma.Patient$conversationsArgs<ExtArgs>;
    interactionRecords?: boolean | Prisma.Patient$interactionRecordsArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    phoneNumber?: boolean;
    name?: boolean;
    dateOfBirth?: boolean;
    consentRecordedAt?: boolean;
    anonymizedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    phoneNumber?: boolean;
    name?: boolean;
    dateOfBirth?: boolean;
    consentRecordedAt?: boolean;
    anonymizedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["patient"]>;
export type PatientSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    phoneNumber?: boolean;
    name?: boolean;
    dateOfBirth?: boolean;
    consentRecordedAt?: boolean;
    anonymizedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PatientOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "phoneNumber" | "name" | "dateOfBirth" | "consentRecordedAt" | "anonymizedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>;
export type PatientInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    appointments?: boolean | Prisma.Patient$appointmentsArgs<ExtArgs>;
    waitlistEntries?: boolean | Prisma.Patient$waitlistEntriesArgs<ExtArgs>;
    conversations?: boolean | Prisma.Patient$conversationsArgs<ExtArgs>;
    interactionRecords?: boolean | Prisma.Patient$interactionRecordsArgs<ExtArgs>;
    _count?: boolean | Prisma.PatientCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PatientIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type PatientIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $PatientPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Patient";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
        appointments: Prisma.$AppointmentPayload<ExtArgs>[];
        waitlistEntries: Prisma.$WaitlistEntryPayload<ExtArgs>[];
        conversations: Prisma.$ConversationPayload<ExtArgs>[];
        interactionRecords: Prisma.$InteractionRecordPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        phoneNumber: string;
        name: string | null;
        dateOfBirth: Date | null;
        consentRecordedAt: Date | null;
        anonymizedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["patient"]>;
    composites: {};
};
export type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PatientPayload, S>;
export type PatientCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PatientCountAggregateInputType | true;
};
export interface PatientDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Patient'];
        meta: {
            name: 'Patient';
        };
    };
    findUnique<T extends PatientFindUniqueArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PatientFindFirstArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PatientFindManyArgs>(args?: Prisma.SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PatientCreateArgs>(args: Prisma.SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PatientCreateManyArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PatientDeleteArgs>(args: Prisma.SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PatientUpdateArgs>(args: Prisma.SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PatientDeleteManyArgs>(args?: Prisma.SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PatientUpdateManyArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PatientUpsertArgs>(args: Prisma.SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PatientCountArgs>(args?: Prisma.Subset<T, PatientCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PatientCountAggregateOutputType> : number>;
    aggregate<T extends PatientAggregateArgs>(args: Prisma.Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>;
    groupBy<T extends PatientGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PatientGroupByArgs['orderBy'];
    } : {
        orderBy?: PatientGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PatientFieldRefs;
}
export interface Prisma__PatientClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    appointments<T extends Prisma.Patient$appointmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    waitlistEntries<T extends Prisma.Patient$waitlistEntriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$waitlistEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    conversations<T extends Prisma.Patient$conversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    interactionRecords<T extends Prisma.Patient$interactionRecordsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Patient$interactionRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PatientFieldRefs {
    readonly id: Prisma.FieldRef<"Patient", 'String'>;
    readonly professionalId: Prisma.FieldRef<"Patient", 'String'>;
    readonly phoneNumber: Prisma.FieldRef<"Patient", 'String'>;
    readonly name: Prisma.FieldRef<"Patient", 'String'>;
    readonly dateOfBirth: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly consentRecordedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly anonymizedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Patient", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Patient", 'DateTime'>;
}
export type PatientFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where: Prisma.PatientWhereUniqueInput;
};
export type PatientFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where: Prisma.PatientWhereUniqueInput;
};
export type PatientFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    cursor?: Prisma.PatientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
export type PatientFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    cursor?: Prisma.PatientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
export type PatientFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where?: Prisma.PatientWhereInput;
    orderBy?: Prisma.PatientOrderByWithRelationInput | Prisma.PatientOrderByWithRelationInput[];
    cursor?: Prisma.PatientWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PatientScalarFieldEnum | Prisma.PatientScalarFieldEnum[];
};
export type PatientCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
};
export type PatientCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PatientCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    data: Prisma.PatientCreateManyInput | Prisma.PatientCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PatientIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PatientUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
    where: Prisma.PatientWhereUniqueInput;
};
export type PatientUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    where?: Prisma.PatientWhereInput;
    limit?: number;
};
export type PatientUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PatientUpdateManyMutationInput, Prisma.PatientUncheckedUpdateManyInput>;
    where?: Prisma.PatientWhereInput;
    limit?: number;
    include?: Prisma.PatientIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PatientUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where: Prisma.PatientWhereUniqueInput;
    create: Prisma.XOR<Prisma.PatientCreateInput, Prisma.PatientUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PatientUpdateInput, Prisma.PatientUncheckedUpdateInput>;
};
export type PatientDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
    where: Prisma.PatientWhereUniqueInput;
};
export type PatientDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PatientWhereInput;
    limit?: number;
};
export type Patient$appointmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Patient$waitlistEntriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    where?: Prisma.WaitlistEntryWhereInput;
    orderBy?: Prisma.WaitlistEntryOrderByWithRelationInput | Prisma.WaitlistEntryOrderByWithRelationInput[];
    cursor?: Prisma.WaitlistEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WaitlistEntryScalarFieldEnum | Prisma.WaitlistEntryScalarFieldEnum[];
};
export type Patient$conversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type Patient$interactionRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    where?: Prisma.InteractionRecordWhereInput;
    orderBy?: Prisma.InteractionRecordOrderByWithRelationInput | Prisma.InteractionRecordOrderByWithRelationInput[];
    cursor?: Prisma.InteractionRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InteractionRecordScalarFieldEnum | Prisma.InteractionRecordScalarFieldEnum[];
};
export type PatientDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PatientSelect<ExtArgs> | null;
    omit?: Prisma.PatientOmit<ExtArgs> | null;
    include?: Prisma.PatientInclude<ExtArgs> | null;
};
