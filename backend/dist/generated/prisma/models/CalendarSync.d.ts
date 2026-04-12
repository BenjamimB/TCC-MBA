import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CalendarSyncModel = runtime.Types.Result.DefaultSelection<Prisma.$CalendarSyncPayload>;
export type AggregateCalendarSync = {
    _count: CalendarSyncCountAggregateOutputType | null;
    _min: CalendarSyncMinAggregateOutputType | null;
    _max: CalendarSyncMaxAggregateOutputType | null;
};
export type CalendarSyncMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    provider: string | null;
    encryptedAccessToken: string | null;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    webhookChannelId: string | null;
    webhookExpiration: Date | null;
    lastSyncedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CalendarSyncMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    provider: string | null;
    encryptedAccessToken: string | null;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    webhookChannelId: string | null;
    webhookExpiration: Date | null;
    lastSyncedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CalendarSyncCountAggregateOutputType = {
    id: number;
    professionalId: number;
    provider: number;
    encryptedAccessToken: number;
    encryptedRefreshToken: number;
    tokenExpiresAt: number;
    webhookChannelId: number;
    webhookExpiration: number;
    lastSyncedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CalendarSyncMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    webhookChannelId?: true;
    webhookExpiration?: true;
    lastSyncedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CalendarSyncMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    webhookChannelId?: true;
    webhookExpiration?: true;
    lastSyncedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CalendarSyncCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    webhookChannelId?: true;
    webhookExpiration?: true;
    lastSyncedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CalendarSyncAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarSyncWhereInput;
    orderBy?: Prisma.CalendarSyncOrderByWithRelationInput | Prisma.CalendarSyncOrderByWithRelationInput[];
    cursor?: Prisma.CalendarSyncWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CalendarSyncCountAggregateInputType;
    _min?: CalendarSyncMinAggregateInputType;
    _max?: CalendarSyncMaxAggregateInputType;
};
export type GetCalendarSyncAggregateType<T extends CalendarSyncAggregateArgs> = {
    [P in keyof T & keyof AggregateCalendarSync]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCalendarSync[P]> : Prisma.GetScalarType<T[P], AggregateCalendarSync[P]>;
};
export type CalendarSyncGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarSyncWhereInput;
    orderBy?: Prisma.CalendarSyncOrderByWithAggregationInput | Prisma.CalendarSyncOrderByWithAggregationInput[];
    by: Prisma.CalendarSyncScalarFieldEnum[] | Prisma.CalendarSyncScalarFieldEnum;
    having?: Prisma.CalendarSyncScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CalendarSyncCountAggregateInputType | true;
    _min?: CalendarSyncMinAggregateInputType;
    _max?: CalendarSyncMaxAggregateInputType;
};
export type CalendarSyncGroupByOutputType = {
    id: string;
    professionalId: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    webhookChannelId: string | null;
    webhookExpiration: Date | null;
    lastSyncedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CalendarSyncCountAggregateOutputType | null;
    _min: CalendarSyncMinAggregateOutputType | null;
    _max: CalendarSyncMaxAggregateOutputType | null;
};
export type GetCalendarSyncGroupByPayload<T extends CalendarSyncGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CalendarSyncGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CalendarSyncGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CalendarSyncGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CalendarSyncGroupByOutputType[P]>;
}>>;
export type CalendarSyncWhereInput = {
    AND?: Prisma.CalendarSyncWhereInput | Prisma.CalendarSyncWhereInput[];
    OR?: Prisma.CalendarSyncWhereInput[];
    NOT?: Prisma.CalendarSyncWhereInput | Prisma.CalendarSyncWhereInput[];
    id?: Prisma.StringFilter<"CalendarSync"> | string;
    professionalId?: Prisma.StringFilter<"CalendarSync"> | string;
    provider?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    webhookChannelId?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    webhookExpiration?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
};
export type CalendarSyncOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookChannelId?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookExpiration?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
};
export type CalendarSyncWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    professionalId_provider?: Prisma.CalendarSyncProfessionalIdProviderCompoundUniqueInput;
    AND?: Prisma.CalendarSyncWhereInput | Prisma.CalendarSyncWhereInput[];
    OR?: Prisma.CalendarSyncWhereInput[];
    NOT?: Prisma.CalendarSyncWhereInput | Prisma.CalendarSyncWhereInput[];
    professionalId?: Prisma.StringFilter<"CalendarSync"> | string;
    provider?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    webhookChannelId?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    webhookExpiration?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
}, "id" | "professionalId_provider">;
export type CalendarSyncOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookChannelId?: Prisma.SortOrderInput | Prisma.SortOrder;
    webhookExpiration?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CalendarSyncCountOrderByAggregateInput;
    _max?: Prisma.CalendarSyncMaxOrderByAggregateInput;
    _min?: Prisma.CalendarSyncMinOrderByAggregateInput;
};
export type CalendarSyncScalarWhereWithAggregatesInput = {
    AND?: Prisma.CalendarSyncScalarWhereWithAggregatesInput | Prisma.CalendarSyncScalarWhereWithAggregatesInput[];
    OR?: Prisma.CalendarSyncScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CalendarSyncScalarWhereWithAggregatesInput | Prisma.CalendarSyncScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CalendarSync"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"CalendarSync"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"CalendarSync"> | string;
    encryptedAccessToken?: Prisma.StringWithAggregatesFilter<"CalendarSync"> | string;
    encryptedRefreshToken?: Prisma.StringNullableWithAggregatesFilter<"CalendarSync"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CalendarSync"> | Date | string | null;
    webhookChannelId?: Prisma.StringNullableWithAggregatesFilter<"CalendarSync"> | string | null;
    webhookExpiration?: Prisma.DateTimeNullableWithAggregatesFilter<"CalendarSync"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CalendarSync"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CalendarSync"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CalendarSync"> | Date | string;
};
export type CalendarSyncCreateInput = {
    id?: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutCalendarSyncsInput;
};
export type CalendarSyncUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CalendarSyncUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutCalendarSyncsNestedInput;
};
export type CalendarSyncUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncCreateManyInput = {
    id?: string;
    professionalId: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CalendarSyncUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncListRelationFilter = {
    every?: Prisma.CalendarSyncWhereInput;
    some?: Prisma.CalendarSyncWhereInput;
    none?: Prisma.CalendarSyncWhereInput;
};
export type CalendarSyncOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CalendarSyncProfessionalIdProviderCompoundUniqueInput = {
    professionalId: string;
    provider: string;
};
export type CalendarSyncCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    webhookChannelId?: Prisma.SortOrder;
    webhookExpiration?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CalendarSyncMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    webhookChannelId?: Prisma.SortOrder;
    webhookExpiration?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CalendarSyncMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    webhookChannelId?: Prisma.SortOrder;
    webhookExpiration?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CalendarSyncCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput> | Prisma.CalendarSyncCreateWithoutProfessionalInput[] | Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput | Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.CalendarSyncCreateManyProfessionalInputEnvelope;
    connect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
};
export type CalendarSyncUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput> | Prisma.CalendarSyncCreateWithoutProfessionalInput[] | Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput | Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.CalendarSyncCreateManyProfessionalInputEnvelope;
    connect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
};
export type CalendarSyncUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput> | Prisma.CalendarSyncCreateWithoutProfessionalInput[] | Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput | Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.CalendarSyncUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.CalendarSyncUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.CalendarSyncCreateManyProfessionalInputEnvelope;
    set?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    disconnect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    delete?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    connect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    update?: Prisma.CalendarSyncUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.CalendarSyncUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.CalendarSyncUpdateManyWithWhereWithoutProfessionalInput | Prisma.CalendarSyncUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.CalendarSyncScalarWhereInput | Prisma.CalendarSyncScalarWhereInput[];
};
export type CalendarSyncUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput> | Prisma.CalendarSyncCreateWithoutProfessionalInput[] | Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput | Prisma.CalendarSyncCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.CalendarSyncUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.CalendarSyncUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.CalendarSyncCreateManyProfessionalInputEnvelope;
    set?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    disconnect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    delete?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    connect?: Prisma.CalendarSyncWhereUniqueInput | Prisma.CalendarSyncWhereUniqueInput[];
    update?: Prisma.CalendarSyncUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.CalendarSyncUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.CalendarSyncUpdateManyWithWhereWithoutProfessionalInput | Prisma.CalendarSyncUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.CalendarSyncScalarWhereInput | Prisma.CalendarSyncScalarWhereInput[];
};
export type CalendarSyncCreateWithoutProfessionalInput = {
    id?: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CalendarSyncUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CalendarSyncCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.CalendarSyncWhereUniqueInput;
    create: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput>;
};
export type CalendarSyncCreateManyProfessionalInputEnvelope = {
    data: Prisma.CalendarSyncCreateManyProfessionalInput | Prisma.CalendarSyncCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type CalendarSyncUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.CalendarSyncWhereUniqueInput;
    update: Prisma.XOR<Prisma.CalendarSyncUpdateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.CalendarSyncCreateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedCreateWithoutProfessionalInput>;
};
export type CalendarSyncUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.CalendarSyncWhereUniqueInput;
    data: Prisma.XOR<Prisma.CalendarSyncUpdateWithoutProfessionalInput, Prisma.CalendarSyncUncheckedUpdateWithoutProfessionalInput>;
};
export type CalendarSyncUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.CalendarSyncScalarWhereInput;
    data: Prisma.XOR<Prisma.CalendarSyncUpdateManyMutationInput, Prisma.CalendarSyncUncheckedUpdateManyWithoutProfessionalInput>;
};
export type CalendarSyncScalarWhereInput = {
    AND?: Prisma.CalendarSyncScalarWhereInput | Prisma.CalendarSyncScalarWhereInput[];
    OR?: Prisma.CalendarSyncScalarWhereInput[];
    NOT?: Prisma.CalendarSyncScalarWhereInput | Prisma.CalendarSyncScalarWhereInput[];
    id?: Prisma.StringFilter<"CalendarSync"> | string;
    professionalId?: Prisma.StringFilter<"CalendarSync"> | string;
    provider?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"CalendarSync"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    webhookChannelId?: Prisma.StringNullableFilter<"CalendarSync"> | string | null;
    webhookExpiration?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"CalendarSync"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CalendarSync"> | Date | string;
};
export type CalendarSyncCreateManyProfessionalInput = {
    id?: string;
    provider: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    webhookChannelId?: string | null;
    webhookExpiration?: Date | string | null;
    lastSyncedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CalendarSyncUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    webhookChannelId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    webhookExpiration?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CalendarSyncSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    webhookChannelId?: boolean;
    webhookExpiration?: boolean;
    lastSyncedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["calendarSync"]>;
export type CalendarSyncSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    webhookChannelId?: boolean;
    webhookExpiration?: boolean;
    lastSyncedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["calendarSync"]>;
export type CalendarSyncSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    webhookChannelId?: boolean;
    webhookExpiration?: boolean;
    lastSyncedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["calendarSync"]>;
export type CalendarSyncSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    webhookChannelId?: boolean;
    webhookExpiration?: boolean;
    lastSyncedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CalendarSyncOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "provider" | "encryptedAccessToken" | "encryptedRefreshToken" | "tokenExpiresAt" | "webhookChannelId" | "webhookExpiration" | "lastSyncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["calendarSync"]>;
export type CalendarSyncInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type CalendarSyncIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type CalendarSyncIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $CalendarSyncPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CalendarSync";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        provider: string;
        encryptedAccessToken: string;
        encryptedRefreshToken: string | null;
        tokenExpiresAt: Date | null;
        webhookChannelId: string | null;
        webhookExpiration: Date | null;
        lastSyncedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["calendarSync"]>;
    composites: {};
};
export type CalendarSyncGetPayload<S extends boolean | null | undefined | CalendarSyncDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload, S>;
export type CalendarSyncCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CalendarSyncFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CalendarSyncCountAggregateInputType | true;
};
export interface CalendarSyncDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CalendarSync'];
        meta: {
            name: 'CalendarSync';
        };
    };
    findUnique<T extends CalendarSyncFindUniqueArgs>(args: Prisma.SelectSubset<T, CalendarSyncFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CalendarSyncFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CalendarSyncFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CalendarSyncFindFirstArgs>(args?: Prisma.SelectSubset<T, CalendarSyncFindFirstArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CalendarSyncFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CalendarSyncFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CalendarSyncFindManyArgs>(args?: Prisma.SelectSubset<T, CalendarSyncFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CalendarSyncCreateArgs>(args: Prisma.SelectSubset<T, CalendarSyncCreateArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CalendarSyncCreateManyArgs>(args?: Prisma.SelectSubset<T, CalendarSyncCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CalendarSyncCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CalendarSyncCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CalendarSyncDeleteArgs>(args: Prisma.SelectSubset<T, CalendarSyncDeleteArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CalendarSyncUpdateArgs>(args: Prisma.SelectSubset<T, CalendarSyncUpdateArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CalendarSyncDeleteManyArgs>(args?: Prisma.SelectSubset<T, CalendarSyncDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CalendarSyncUpdateManyArgs>(args: Prisma.SelectSubset<T, CalendarSyncUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CalendarSyncUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CalendarSyncUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CalendarSyncUpsertArgs>(args: Prisma.SelectSubset<T, CalendarSyncUpsertArgs<ExtArgs>>): Prisma.Prisma__CalendarSyncClient<runtime.Types.Result.GetResult<Prisma.$CalendarSyncPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CalendarSyncCountArgs>(args?: Prisma.Subset<T, CalendarSyncCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CalendarSyncCountAggregateOutputType> : number>;
    aggregate<T extends CalendarSyncAggregateArgs>(args: Prisma.Subset<T, CalendarSyncAggregateArgs>): Prisma.PrismaPromise<GetCalendarSyncAggregateType<T>>;
    groupBy<T extends CalendarSyncGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CalendarSyncGroupByArgs['orderBy'];
    } : {
        orderBy?: CalendarSyncGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CalendarSyncGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarSyncGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CalendarSyncFieldRefs;
}
export interface Prisma__CalendarSyncClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CalendarSyncFieldRefs {
    readonly id: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly professionalId: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly provider: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly encryptedAccessToken: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly encryptedRefreshToken: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly tokenExpiresAt: Prisma.FieldRef<"CalendarSync", 'DateTime'>;
    readonly webhookChannelId: Prisma.FieldRef<"CalendarSync", 'String'>;
    readonly webhookExpiration: Prisma.FieldRef<"CalendarSync", 'DateTime'>;
    readonly lastSyncedAt: Prisma.FieldRef<"CalendarSync", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CalendarSync", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CalendarSync", 'DateTime'>;
}
export type CalendarSyncFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where: Prisma.CalendarSyncWhereUniqueInput;
};
export type CalendarSyncFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where: Prisma.CalendarSyncWhereUniqueInput;
};
export type CalendarSyncFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where?: Prisma.CalendarSyncWhereInput;
    orderBy?: Prisma.CalendarSyncOrderByWithRelationInput | Prisma.CalendarSyncOrderByWithRelationInput[];
    cursor?: Prisma.CalendarSyncWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarSyncScalarFieldEnum | Prisma.CalendarSyncScalarFieldEnum[];
};
export type CalendarSyncFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where?: Prisma.CalendarSyncWhereInput;
    orderBy?: Prisma.CalendarSyncOrderByWithRelationInput | Prisma.CalendarSyncOrderByWithRelationInput[];
    cursor?: Prisma.CalendarSyncWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarSyncScalarFieldEnum | Prisma.CalendarSyncScalarFieldEnum[];
};
export type CalendarSyncFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where?: Prisma.CalendarSyncWhereInput;
    orderBy?: Prisma.CalendarSyncOrderByWithRelationInput | Prisma.CalendarSyncOrderByWithRelationInput[];
    cursor?: Prisma.CalendarSyncWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CalendarSyncScalarFieldEnum | Prisma.CalendarSyncScalarFieldEnum[];
};
export type CalendarSyncCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarSyncCreateInput, Prisma.CalendarSyncUncheckedCreateInput>;
};
export type CalendarSyncCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CalendarSyncCreateManyInput | Prisma.CalendarSyncCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CalendarSyncCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    data: Prisma.CalendarSyncCreateManyInput | Prisma.CalendarSyncCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CalendarSyncIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CalendarSyncUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarSyncUpdateInput, Prisma.CalendarSyncUncheckedUpdateInput>;
    where: Prisma.CalendarSyncWhereUniqueInput;
};
export type CalendarSyncUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CalendarSyncUpdateManyMutationInput, Prisma.CalendarSyncUncheckedUpdateManyInput>;
    where?: Prisma.CalendarSyncWhereInput;
    limit?: number;
};
export type CalendarSyncUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CalendarSyncUpdateManyMutationInput, Prisma.CalendarSyncUncheckedUpdateManyInput>;
    where?: Prisma.CalendarSyncWhereInput;
    limit?: number;
    include?: Prisma.CalendarSyncIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CalendarSyncUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where: Prisma.CalendarSyncWhereUniqueInput;
    create: Prisma.XOR<Prisma.CalendarSyncCreateInput, Prisma.CalendarSyncUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CalendarSyncUpdateInput, Prisma.CalendarSyncUncheckedUpdateInput>;
};
export type CalendarSyncDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
    where: Prisma.CalendarSyncWhereUniqueInput;
};
export type CalendarSyncDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CalendarSyncWhereInput;
    limit?: number;
};
export type CalendarSyncDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CalendarSyncSelect<ExtArgs> | null;
    omit?: Prisma.CalendarSyncOmit<ExtArgs> | null;
    include?: Prisma.CalendarSyncInclude<ExtArgs> | null;
};
