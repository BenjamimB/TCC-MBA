import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type WaitlistEntryModel = runtime.Types.Result.DefaultSelection<Prisma.$WaitlistEntryPayload>;
export type AggregateWaitlistEntry = {
    _count: WaitlistEntryCountAggregateOutputType | null;
    _min: WaitlistEntryMinAggregateOutputType | null;
    _max: WaitlistEntryMaxAggregateOutputType | null;
};
export type WaitlistEntryMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    requestedDate: Date | null;
    notifiedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WaitlistEntryMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    requestedDate: Date | null;
    notifiedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WaitlistEntryCountAggregateOutputType = {
    id: number;
    professionalId: number;
    patientId: number;
    requestedDate: number;
    notifiedAt: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WaitlistEntryMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    requestedDate?: true;
    notifiedAt?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WaitlistEntryMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    requestedDate?: true;
    notifiedAt?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WaitlistEntryCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    requestedDate?: true;
    notifiedAt?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WaitlistEntryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WaitlistEntryWhereInput;
    orderBy?: Prisma.WaitlistEntryOrderByWithRelationInput | Prisma.WaitlistEntryOrderByWithRelationInput[];
    cursor?: Prisma.WaitlistEntryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WaitlistEntryCountAggregateInputType;
    _min?: WaitlistEntryMinAggregateInputType;
    _max?: WaitlistEntryMaxAggregateInputType;
};
export type GetWaitlistEntryAggregateType<T extends WaitlistEntryAggregateArgs> = {
    [P in keyof T & keyof AggregateWaitlistEntry]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWaitlistEntry[P]> : Prisma.GetScalarType<T[P], AggregateWaitlistEntry[P]>;
};
export type WaitlistEntryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WaitlistEntryWhereInput;
    orderBy?: Prisma.WaitlistEntryOrderByWithAggregationInput | Prisma.WaitlistEntryOrderByWithAggregationInput[];
    by: Prisma.WaitlistEntryScalarFieldEnum[] | Prisma.WaitlistEntryScalarFieldEnum;
    having?: Prisma.WaitlistEntryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WaitlistEntryCountAggregateInputType | true;
    _min?: WaitlistEntryMinAggregateInputType;
    _max?: WaitlistEntryMaxAggregateInputType;
};
export type WaitlistEntryGroupByOutputType = {
    id: string;
    professionalId: string;
    patientId: string;
    requestedDate: Date;
    notifiedAt: Date | null;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WaitlistEntryCountAggregateOutputType | null;
    _min: WaitlistEntryMinAggregateOutputType | null;
    _max: WaitlistEntryMaxAggregateOutputType | null;
};
export type GetWaitlistEntryGroupByPayload<T extends WaitlistEntryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WaitlistEntryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WaitlistEntryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WaitlistEntryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WaitlistEntryGroupByOutputType[P]>;
}>>;
export type WaitlistEntryWhereInput = {
    AND?: Prisma.WaitlistEntryWhereInput | Prisma.WaitlistEntryWhereInput[];
    OR?: Prisma.WaitlistEntryWhereInput[];
    NOT?: Prisma.WaitlistEntryWhereInput | Prisma.WaitlistEntryWhereInput[];
    id?: Prisma.StringFilter<"WaitlistEntry"> | string;
    professionalId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    patientId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    requestedDate?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
};
export type WaitlistEntryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    requestedDate?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
};
export type WaitlistEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WaitlistEntryWhereInput | Prisma.WaitlistEntryWhereInput[];
    OR?: Prisma.WaitlistEntryWhereInput[];
    NOT?: Prisma.WaitlistEntryWhereInput | Prisma.WaitlistEntryWhereInput[];
    professionalId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    patientId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    requestedDate?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
}, "id">;
export type WaitlistEntryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    requestedDate?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WaitlistEntryCountOrderByAggregateInput;
    _max?: Prisma.WaitlistEntryMaxOrderByAggregateInput;
    _min?: Prisma.WaitlistEntryMinOrderByAggregateInput;
};
export type WaitlistEntryScalarWhereWithAggregatesInput = {
    AND?: Prisma.WaitlistEntryScalarWhereWithAggregatesInput | Prisma.WaitlistEntryScalarWhereWithAggregatesInput[];
    OR?: Prisma.WaitlistEntryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WaitlistEntryScalarWhereWithAggregatesInput | Prisma.WaitlistEntryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WaitlistEntry"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"WaitlistEntry"> | string;
    patientId?: Prisma.StringWithAggregatesFilter<"WaitlistEntry"> | string;
    requestedDate?: Prisma.DateTimeWithAggregatesFilter<"WaitlistEntry"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WaitlistEntry"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"WaitlistEntry"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WaitlistEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WaitlistEntry"> | Date | string;
};
export type WaitlistEntryCreateInput = {
    id?: string;
    professionalId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutWaitlistEntriesInput;
};
export type WaitlistEntryUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WaitlistEntryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutWaitlistEntriesNestedInput;
};
export type WaitlistEntryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntryCreateManyInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WaitlistEntryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntryListRelationFilter = {
    every?: Prisma.WaitlistEntryWhereInput;
    some?: Prisma.WaitlistEntryWhereInput;
    none?: Prisma.WaitlistEntryWhereInput;
};
export type WaitlistEntryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WaitlistEntryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    requestedDate?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WaitlistEntryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    requestedDate?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WaitlistEntryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    requestedDate?: Prisma.SortOrder;
    notifiedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WaitlistEntryCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput> | Prisma.WaitlistEntryCreateWithoutPatientInput[] | Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput | Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.WaitlistEntryCreateManyPatientInputEnvelope;
    connect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
};
export type WaitlistEntryUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput> | Prisma.WaitlistEntryCreateWithoutPatientInput[] | Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput | Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.WaitlistEntryCreateManyPatientInputEnvelope;
    connect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
};
export type WaitlistEntryUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput> | Prisma.WaitlistEntryCreateWithoutPatientInput[] | Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput | Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.WaitlistEntryUpsertWithWhereUniqueWithoutPatientInput | Prisma.WaitlistEntryUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.WaitlistEntryCreateManyPatientInputEnvelope;
    set?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    disconnect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    delete?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    connect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    update?: Prisma.WaitlistEntryUpdateWithWhereUniqueWithoutPatientInput | Prisma.WaitlistEntryUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.WaitlistEntryUpdateManyWithWhereWithoutPatientInput | Prisma.WaitlistEntryUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.WaitlistEntryScalarWhereInput | Prisma.WaitlistEntryScalarWhereInput[];
};
export type WaitlistEntryUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput> | Prisma.WaitlistEntryCreateWithoutPatientInput[] | Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput | Prisma.WaitlistEntryCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.WaitlistEntryUpsertWithWhereUniqueWithoutPatientInput | Prisma.WaitlistEntryUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.WaitlistEntryCreateManyPatientInputEnvelope;
    set?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    disconnect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    delete?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    connect?: Prisma.WaitlistEntryWhereUniqueInput | Prisma.WaitlistEntryWhereUniqueInput[];
    update?: Prisma.WaitlistEntryUpdateWithWhereUniqueWithoutPatientInput | Prisma.WaitlistEntryUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.WaitlistEntryUpdateManyWithWhereWithoutPatientInput | Prisma.WaitlistEntryUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.WaitlistEntryScalarWhereInput | Prisma.WaitlistEntryScalarWhereInput[];
};
export type WaitlistEntryCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WaitlistEntryUncheckedCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WaitlistEntryCreateOrConnectWithoutPatientInput = {
    where: Prisma.WaitlistEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput>;
};
export type WaitlistEntryCreateManyPatientInputEnvelope = {
    data: Prisma.WaitlistEntryCreateManyPatientInput | Prisma.WaitlistEntryCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type WaitlistEntryUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.WaitlistEntryWhereUniqueInput;
    update: Prisma.XOR<Prisma.WaitlistEntryUpdateWithoutPatientInput, Prisma.WaitlistEntryUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.WaitlistEntryCreateWithoutPatientInput, Prisma.WaitlistEntryUncheckedCreateWithoutPatientInput>;
};
export type WaitlistEntryUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.WaitlistEntryWhereUniqueInput;
    data: Prisma.XOR<Prisma.WaitlistEntryUpdateWithoutPatientInput, Prisma.WaitlistEntryUncheckedUpdateWithoutPatientInput>;
};
export type WaitlistEntryUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.WaitlistEntryScalarWhereInput;
    data: Prisma.XOR<Prisma.WaitlistEntryUpdateManyMutationInput, Prisma.WaitlistEntryUncheckedUpdateManyWithoutPatientInput>;
};
export type WaitlistEntryScalarWhereInput = {
    AND?: Prisma.WaitlistEntryScalarWhereInput | Prisma.WaitlistEntryScalarWhereInput[];
    OR?: Prisma.WaitlistEntryScalarWhereInput[];
    NOT?: Prisma.WaitlistEntryScalarWhereInput | Prisma.WaitlistEntryScalarWhereInput[];
    id?: Prisma.StringFilter<"WaitlistEntry"> | string;
    professionalId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    patientId?: Prisma.StringFilter<"WaitlistEntry"> | string;
    requestedDate?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    notifiedAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"WaitlistEntry"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WaitlistEntry"> | Date | string;
};
export type WaitlistEntryCreateManyPatientInput = {
    id?: string;
    professionalId: string;
    requestedDate: Date | string;
    notifiedAt?: Date | string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WaitlistEntryUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntryUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntryUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    requestedDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    notifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WaitlistEntrySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    requestedDate?: boolean;
    notifiedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["waitlistEntry"]>;
export type WaitlistEntrySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    requestedDate?: boolean;
    notifiedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["waitlistEntry"]>;
export type WaitlistEntrySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    requestedDate?: boolean;
    notifiedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["waitlistEntry"]>;
export type WaitlistEntrySelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    requestedDate?: boolean;
    notifiedAt?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WaitlistEntryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "patientId" | "requestedDate" | "notifiedAt" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["waitlistEntry"]>;
export type WaitlistEntryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type WaitlistEntryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type WaitlistEntryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $WaitlistEntryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WaitlistEntry";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        patientId: string;
        requestedDate: Date;
        notifiedAt: Date | null;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["waitlistEntry"]>;
    composites: {};
};
export type WaitlistEntryGetPayload<S extends boolean | null | undefined | WaitlistEntryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload, S>;
export type WaitlistEntryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WaitlistEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WaitlistEntryCountAggregateInputType | true;
};
export interface WaitlistEntryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WaitlistEntry'];
        meta: {
            name: 'WaitlistEntry';
        };
    };
    findUnique<T extends WaitlistEntryFindUniqueArgs>(args: Prisma.SelectSubset<T, WaitlistEntryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WaitlistEntryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WaitlistEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WaitlistEntryFindFirstArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryFindFirstArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WaitlistEntryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WaitlistEntryFindManyArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WaitlistEntryCreateArgs>(args: Prisma.SelectSubset<T, WaitlistEntryCreateArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WaitlistEntryCreateManyArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WaitlistEntryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WaitlistEntryDeleteArgs>(args: Prisma.SelectSubset<T, WaitlistEntryDeleteArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WaitlistEntryUpdateArgs>(args: Prisma.SelectSubset<T, WaitlistEntryUpdateArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WaitlistEntryDeleteManyArgs>(args?: Prisma.SelectSubset<T, WaitlistEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WaitlistEntryUpdateManyArgs>(args: Prisma.SelectSubset<T, WaitlistEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WaitlistEntryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WaitlistEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WaitlistEntryUpsertArgs>(args: Prisma.SelectSubset<T, WaitlistEntryUpsertArgs<ExtArgs>>): Prisma.Prisma__WaitlistEntryClient<runtime.Types.Result.GetResult<Prisma.$WaitlistEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WaitlistEntryCountArgs>(args?: Prisma.Subset<T, WaitlistEntryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WaitlistEntryCountAggregateOutputType> : number>;
    aggregate<T extends WaitlistEntryAggregateArgs>(args: Prisma.Subset<T, WaitlistEntryAggregateArgs>): Prisma.PrismaPromise<GetWaitlistEntryAggregateType<T>>;
    groupBy<T extends WaitlistEntryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WaitlistEntryGroupByArgs['orderBy'];
    } : {
        orderBy?: WaitlistEntryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WaitlistEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWaitlistEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WaitlistEntryFieldRefs;
}
export interface Prisma__WaitlistEntryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WaitlistEntryFieldRefs {
    readonly id: Prisma.FieldRef<"WaitlistEntry", 'String'>;
    readonly professionalId: Prisma.FieldRef<"WaitlistEntry", 'String'>;
    readonly patientId: Prisma.FieldRef<"WaitlistEntry", 'String'>;
    readonly requestedDate: Prisma.FieldRef<"WaitlistEntry", 'DateTime'>;
    readonly notifiedAt: Prisma.FieldRef<"WaitlistEntry", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"WaitlistEntry", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"WaitlistEntry", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WaitlistEntry", 'DateTime'>;
}
export type WaitlistEntryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    where: Prisma.WaitlistEntryWhereUniqueInput;
};
export type WaitlistEntryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    where: Prisma.WaitlistEntryWhereUniqueInput;
};
export type WaitlistEntryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WaitlistEntryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WaitlistEntryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WaitlistEntryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WaitlistEntryCreateInput, Prisma.WaitlistEntryUncheckedCreateInput>;
};
export type WaitlistEntryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WaitlistEntryCreateManyInput | Prisma.WaitlistEntryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WaitlistEntryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    data: Prisma.WaitlistEntryCreateManyInput | Prisma.WaitlistEntryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WaitlistEntryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WaitlistEntryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WaitlistEntryUpdateInput, Prisma.WaitlistEntryUncheckedUpdateInput>;
    where: Prisma.WaitlistEntryWhereUniqueInput;
};
export type WaitlistEntryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WaitlistEntryUpdateManyMutationInput, Prisma.WaitlistEntryUncheckedUpdateManyInput>;
    where?: Prisma.WaitlistEntryWhereInput;
    limit?: number;
};
export type WaitlistEntryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WaitlistEntryUpdateManyMutationInput, Prisma.WaitlistEntryUncheckedUpdateManyInput>;
    where?: Prisma.WaitlistEntryWhereInput;
    limit?: number;
    include?: Prisma.WaitlistEntryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WaitlistEntryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    where: Prisma.WaitlistEntryWhereUniqueInput;
    create: Prisma.XOR<Prisma.WaitlistEntryCreateInput, Prisma.WaitlistEntryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WaitlistEntryUpdateInput, Prisma.WaitlistEntryUncheckedUpdateInput>;
};
export type WaitlistEntryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
    where: Prisma.WaitlistEntryWhereUniqueInput;
};
export type WaitlistEntryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WaitlistEntryWhereInput;
    limit?: number;
};
export type WaitlistEntryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WaitlistEntrySelect<ExtArgs> | null;
    omit?: Prisma.WaitlistEntryOmit<ExtArgs> | null;
    include?: Prisma.WaitlistEntryInclude<ExtArgs> | null;
};
