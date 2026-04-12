import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type OauthAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$OauthAccountPayload>;
export type AggregateOauthAccount = {
    _count: OauthAccountCountAggregateOutputType | null;
    _min: OauthAccountMinAggregateOutputType | null;
    _max: OauthAccountMaxAggregateOutputType | null;
};
export type OauthAccountMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    provider: string | null;
    providerAccountId: string | null;
    encryptedAccessToken: string | null;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthAccountMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    provider: string | null;
    providerAccountId: string | null;
    encryptedAccessToken: string | null;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OauthAccountCountAggregateOutputType = {
    id: number;
    professionalId: number;
    provider: number;
    providerAccountId: number;
    encryptedAccessToken: number;
    encryptedRefreshToken: number;
    tokenExpiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OauthAccountMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    providerAccountId?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthAccountMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    providerAccountId?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OauthAccountCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    provider?: true;
    providerAccountId?: true;
    encryptedAccessToken?: true;
    encryptedRefreshToken?: true;
    tokenExpiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OauthAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccountWhereInput;
    orderBy?: Prisma.OauthAccountOrderByWithRelationInput | Prisma.OauthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OauthAccountCountAggregateInputType;
    _min?: OauthAccountMinAggregateInputType;
    _max?: OauthAccountMaxAggregateInputType;
};
export type GetOauthAccountAggregateType<T extends OauthAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateOauthAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOauthAccount[P]> : Prisma.GetScalarType<T[P], AggregateOauthAccount[P]>;
};
export type OauthAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccountWhereInput;
    orderBy?: Prisma.OauthAccountOrderByWithAggregationInput | Prisma.OauthAccountOrderByWithAggregationInput[];
    by: Prisma.OauthAccountScalarFieldEnum[] | Prisma.OauthAccountScalarFieldEnum;
    having?: Prisma.OauthAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OauthAccountCountAggregateInputType | true;
    _min?: OauthAccountMinAggregateInputType;
    _max?: OauthAccountMaxAggregateInputType;
};
export type OauthAccountGroupByOutputType = {
    id: string;
    professionalId: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken: string | null;
    tokenExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OauthAccountCountAggregateOutputType | null;
    _min: OauthAccountMinAggregateOutputType | null;
    _max: OauthAccountMaxAggregateOutputType | null;
};
export type GetOauthAccountGroupByPayload<T extends OauthAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OauthAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OauthAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OauthAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OauthAccountGroupByOutputType[P]>;
}>>;
export type OauthAccountWhereInput = {
    AND?: Prisma.OauthAccountWhereInput | Prisma.OauthAccountWhereInput[];
    OR?: Prisma.OauthAccountWhereInput[];
    NOT?: Prisma.OauthAccountWhereInput | Prisma.OauthAccountWhereInput[];
    id?: Prisma.StringFilter<"OauthAccount"> | string;
    professionalId?: Prisma.StringFilter<"OauthAccount"> | string;
    provider?: Prisma.StringFilter<"OauthAccount"> | string;
    providerAccountId?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"OauthAccount"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"OauthAccount"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
};
export type OauthAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerAccountId?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
};
export type OauthAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    provider_providerAccountId?: Prisma.OauthAccountProviderProviderAccountIdCompoundUniqueInput;
    professionalId_provider?: Prisma.OauthAccountProfessionalIdProviderCompoundUniqueInput;
    AND?: Prisma.OauthAccountWhereInput | Prisma.OauthAccountWhereInput[];
    OR?: Prisma.OauthAccountWhereInput[];
    NOT?: Prisma.OauthAccountWhereInput | Prisma.OauthAccountWhereInput[];
    professionalId?: Prisma.StringFilter<"OauthAccount"> | string;
    provider?: Prisma.StringFilter<"OauthAccount"> | string;
    providerAccountId?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"OauthAccount"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"OauthAccount"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
}, "id" | "provider_providerAccountId" | "professionalId_provider">;
export type OauthAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerAccountId?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OauthAccountCountOrderByAggregateInput;
    _max?: Prisma.OauthAccountMaxOrderByAggregateInput;
    _min?: Prisma.OauthAccountMinOrderByAggregateInput;
};
export type OauthAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.OauthAccountScalarWhereWithAggregatesInput | Prisma.OauthAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.OauthAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OauthAccountScalarWhereWithAggregatesInput | Prisma.OauthAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OauthAccount"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"OauthAccount"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"OauthAccount"> | string;
    providerAccountId?: Prisma.StringWithAggregatesFilter<"OauthAccount"> | string;
    encryptedAccessToken?: Prisma.StringWithAggregatesFilter<"OauthAccount"> | string;
    encryptedRefreshToken?: Prisma.StringNullableWithAggregatesFilter<"OauthAccount"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"OauthAccount"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OauthAccount"> | Date | string;
};
export type OauthAccountCreateInput = {
    id?: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutOauthAccountsInput;
};
export type OauthAccountUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OauthAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutOauthAccountsNestedInput;
};
export type OauthAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountCreateManyInput = {
    id?: string;
    professionalId: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OauthAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountListRelationFilter = {
    every?: Prisma.OauthAccountWhereInput;
    some?: Prisma.OauthAccountWhereInput;
    none?: Prisma.OauthAccountWhereInput;
};
export type OauthAccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OauthAccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string;
    providerAccountId: string;
};
export type OauthAccountProfessionalIdProviderCompoundUniqueInput = {
    professionalId: string;
    provider: string;
};
export type OauthAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerAccountId?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerAccountId?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerAccountId?: Prisma.SortOrder;
    encryptedAccessToken?: Prisma.SortOrder;
    encryptedRefreshToken?: Prisma.SortOrder;
    tokenExpiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OauthAccountCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput> | Prisma.OauthAccountCreateWithoutProfessionalInput[] | Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput | Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.OauthAccountCreateManyProfessionalInputEnvelope;
    connect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
};
export type OauthAccountUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput> | Prisma.OauthAccountCreateWithoutProfessionalInput[] | Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput | Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.OauthAccountCreateManyProfessionalInputEnvelope;
    connect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
};
export type OauthAccountUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput> | Prisma.OauthAccountCreateWithoutProfessionalInput[] | Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput | Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.OauthAccountUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.OauthAccountUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.OauthAccountCreateManyProfessionalInputEnvelope;
    set?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    disconnect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    delete?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    connect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    update?: Prisma.OauthAccountUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.OauthAccountUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.OauthAccountUpdateManyWithWhereWithoutProfessionalInput | Prisma.OauthAccountUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.OauthAccountScalarWhereInput | Prisma.OauthAccountScalarWhereInput[];
};
export type OauthAccountUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput> | Prisma.OauthAccountCreateWithoutProfessionalInput[] | Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput | Prisma.OauthAccountCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.OauthAccountUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.OauthAccountUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.OauthAccountCreateManyProfessionalInputEnvelope;
    set?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    disconnect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    delete?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    connect?: Prisma.OauthAccountWhereUniqueInput | Prisma.OauthAccountWhereUniqueInput[];
    update?: Prisma.OauthAccountUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.OauthAccountUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.OauthAccountUpdateManyWithWhereWithoutProfessionalInput | Prisma.OauthAccountUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.OauthAccountScalarWhereInput | Prisma.OauthAccountScalarWhereInput[];
};
export type OauthAccountCreateWithoutProfessionalInput = {
    id?: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OauthAccountUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OauthAccountCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.OauthAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput>;
};
export type OauthAccountCreateManyProfessionalInputEnvelope = {
    data: Prisma.OauthAccountCreateManyProfessionalInput | Prisma.OauthAccountCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type OauthAccountUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.OauthAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.OauthAccountUpdateWithoutProfessionalInput, Prisma.OauthAccountUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.OauthAccountCreateWithoutProfessionalInput, Prisma.OauthAccountUncheckedCreateWithoutProfessionalInput>;
};
export type OauthAccountUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.OauthAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.OauthAccountUpdateWithoutProfessionalInput, Prisma.OauthAccountUncheckedUpdateWithoutProfessionalInput>;
};
export type OauthAccountUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.OauthAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.OauthAccountUpdateManyMutationInput, Prisma.OauthAccountUncheckedUpdateManyWithoutProfessionalInput>;
};
export type OauthAccountScalarWhereInput = {
    AND?: Prisma.OauthAccountScalarWhereInput | Prisma.OauthAccountScalarWhereInput[];
    OR?: Prisma.OauthAccountScalarWhereInput[];
    NOT?: Prisma.OauthAccountScalarWhereInput | Prisma.OauthAccountScalarWhereInput[];
    id?: Prisma.StringFilter<"OauthAccount"> | string;
    professionalId?: Prisma.StringFilter<"OauthAccount"> | string;
    provider?: Prisma.StringFilter<"OauthAccount"> | string;
    providerAccountId?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedAccessToken?: Prisma.StringFilter<"OauthAccount"> | string;
    encryptedRefreshToken?: Prisma.StringNullableFilter<"OauthAccount"> | string | null;
    tokenExpiresAt?: Prisma.DateTimeNullableFilter<"OauthAccount"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OauthAccount"> | Date | string;
};
export type OauthAccountCreateManyProfessionalInput = {
    id?: string;
    provider: string;
    providerAccountId: string;
    encryptedAccessToken: string;
    encryptedRefreshToken?: string | null;
    tokenExpiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OauthAccountUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerAccountId?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedAccessToken?: Prisma.StringFieldUpdateOperationsInput | string;
    encryptedRefreshToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tokenExpiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OauthAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccount"]>;
export type OauthAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccount"]>;
export type OauthAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oauthAccount"]>;
export type OauthAccountSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    encryptedAccessToken?: boolean;
    encryptedRefreshToken?: boolean;
    tokenExpiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OauthAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "provider" | "providerAccountId" | "encryptedAccessToken" | "encryptedRefreshToken" | "tokenExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["oauthAccount"]>;
export type OauthAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type OauthAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type OauthAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $OauthAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OauthAccount";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        provider: string;
        providerAccountId: string;
        encryptedAccessToken: string;
        encryptedRefreshToken: string | null;
        tokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["oauthAccount"]>;
    composites: {};
};
export type OauthAccountGetPayload<S extends boolean | null | undefined | OauthAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload, S>;
export type OauthAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OauthAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OauthAccountCountAggregateInputType | true;
};
export interface OauthAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OauthAccount'];
        meta: {
            name: 'OauthAccount';
        };
    };
    findUnique<T extends OauthAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, OauthAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OauthAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OauthAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OauthAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, OauthAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OauthAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OauthAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OauthAccountFindManyArgs>(args?: Prisma.SelectSubset<T, OauthAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OauthAccountCreateArgs>(args: Prisma.SelectSubset<T, OauthAccountCreateArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OauthAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, OauthAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OauthAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OauthAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OauthAccountDeleteArgs>(args: Prisma.SelectSubset<T, OauthAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OauthAccountUpdateArgs>(args: Prisma.SelectSubset<T, OauthAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OauthAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, OauthAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OauthAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, OauthAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OauthAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OauthAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OauthAccountUpsertArgs>(args: Prisma.SelectSubset<T, OauthAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__OauthAccountClient<runtime.Types.Result.GetResult<Prisma.$OauthAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OauthAccountCountArgs>(args?: Prisma.Subset<T, OauthAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OauthAccountCountAggregateOutputType> : number>;
    aggregate<T extends OauthAccountAggregateArgs>(args: Prisma.Subset<T, OauthAccountAggregateArgs>): Prisma.PrismaPromise<GetOauthAccountAggregateType<T>>;
    groupBy<T extends OauthAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OauthAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: OauthAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OauthAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauthAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OauthAccountFieldRefs;
}
export interface Prisma__OauthAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OauthAccountFieldRefs {
    readonly id: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly professionalId: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly provider: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly providerAccountId: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly encryptedAccessToken: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly encryptedRefreshToken: Prisma.FieldRef<"OauthAccount", 'String'>;
    readonly tokenExpiresAt: Prisma.FieldRef<"OauthAccount", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"OauthAccount", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OauthAccount", 'DateTime'>;
}
export type OauthAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where: Prisma.OauthAccountWhereUniqueInput;
};
export type OauthAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where: Prisma.OauthAccountWhereUniqueInput;
};
export type OauthAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where?: Prisma.OauthAccountWhereInput;
    orderBy?: Prisma.OauthAccountOrderByWithRelationInput | Prisma.OauthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccountScalarFieldEnum | Prisma.OauthAccountScalarFieldEnum[];
};
export type OauthAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where?: Prisma.OauthAccountWhereInput;
    orderBy?: Prisma.OauthAccountOrderByWithRelationInput | Prisma.OauthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccountScalarFieldEnum | Prisma.OauthAccountScalarFieldEnum[];
};
export type OauthAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where?: Prisma.OauthAccountWhereInput;
    orderBy?: Prisma.OauthAccountOrderByWithRelationInput | Prisma.OauthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OauthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OauthAccountScalarFieldEnum | Prisma.OauthAccountScalarFieldEnum[];
};
export type OauthAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccountCreateInput, Prisma.OauthAccountUncheckedCreateInput>;
};
export type OauthAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OauthAccountCreateManyInput | Prisma.OauthAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OauthAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    data: Prisma.OauthAccountCreateManyInput | Prisma.OauthAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OauthAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OauthAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccountUpdateInput, Prisma.OauthAccountUncheckedUpdateInput>;
    where: Prisma.OauthAccountWhereUniqueInput;
};
export type OauthAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OauthAccountUpdateManyMutationInput, Prisma.OauthAccountUncheckedUpdateManyInput>;
    where?: Prisma.OauthAccountWhereInput;
    limit?: number;
};
export type OauthAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OauthAccountUpdateManyMutationInput, Prisma.OauthAccountUncheckedUpdateManyInput>;
    where?: Prisma.OauthAccountWhereInput;
    limit?: number;
    include?: Prisma.OauthAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OauthAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where: Prisma.OauthAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.OauthAccountCreateInput, Prisma.OauthAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OauthAccountUpdateInput, Prisma.OauthAccountUncheckedUpdateInput>;
};
export type OauthAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
    where: Prisma.OauthAccountWhereUniqueInput;
};
export type OauthAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OauthAccountWhereInput;
    limit?: number;
};
export type OauthAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OauthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OauthAccountOmit<ExtArgs> | null;
    include?: Prisma.OauthAccountInclude<ExtArgs> | null;
};
