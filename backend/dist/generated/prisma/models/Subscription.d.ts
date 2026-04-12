import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SubscriptionModel = runtime.Types.Result.DefaultSelection<Prisma.$SubscriptionPayload>;
export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null;
    _min: SubscriptionMinAggregateOutputType | null;
    _max: SubscriptionMaxAggregateOutputType | null;
};
export type SubscriptionMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    plan: $Enums.SubscriptionPlan | null;
    status: $Enums.SubscriptionStatus | null;
    trialEndsAt: Date | null;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    asaasSubscriptionId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubscriptionMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    plan: $Enums.SubscriptionPlan | null;
    status: $Enums.SubscriptionStatus | null;
    trialEndsAt: Date | null;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    asaasSubscriptionId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SubscriptionCountAggregateOutputType = {
    id: number;
    professionalId: number;
    plan: number;
    status: number;
    trialEndsAt: number;
    currentPeriodStart: number;
    currentPeriodEnd: number;
    asaasSubscriptionId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SubscriptionMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    plan?: true;
    status?: true;
    trialEndsAt?: true;
    currentPeriodStart?: true;
    currentPeriodEnd?: true;
    asaasSubscriptionId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubscriptionMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    plan?: true;
    status?: true;
    trialEndsAt?: true;
    currentPeriodStart?: true;
    currentPeriodEnd?: true;
    asaasSubscriptionId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SubscriptionCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    plan?: true;
    status?: true;
    trialEndsAt?: true;
    currentPeriodStart?: true;
    currentPeriodEnd?: true;
    asaasSubscriptionId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SubscriptionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithRelationInput | Prisma.SubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubscriptionCountAggregateInputType;
    _min?: SubscriptionMinAggregateInputType;
    _max?: SubscriptionMaxAggregateInputType;
};
export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
    [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubscription[P]> : Prisma.GetScalarType<T[P], AggregateSubscription[P]>;
};
export type SubscriptionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithAggregationInput | Prisma.SubscriptionOrderByWithAggregationInput[];
    by: Prisma.SubscriptionScalarFieldEnum[] | Prisma.SubscriptionScalarFieldEnum;
    having?: Prisma.SubscriptionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubscriptionCountAggregateInputType | true;
    _min?: SubscriptionMinAggregateInputType;
    _max?: SubscriptionMaxAggregateInputType;
};
export type SubscriptionGroupByOutputType = {
    id: string;
    professionalId: string;
    plan: $Enums.SubscriptionPlan;
    status: $Enums.SubscriptionStatus;
    trialEndsAt: Date | null;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    asaasSubscriptionId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SubscriptionCountAggregateOutputType | null;
    _min: SubscriptionMinAggregateOutputType | null;
    _max: SubscriptionMaxAggregateOutputType | null;
};
export type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubscriptionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubscriptionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubscriptionGroupByOutputType[P]>;
}>>;
export type SubscriptionWhereInput = {
    AND?: Prisma.SubscriptionWhereInput | Prisma.SubscriptionWhereInput[];
    OR?: Prisma.SubscriptionWhereInput[];
    NOT?: Prisma.SubscriptionWhereInput | Prisma.SubscriptionWhereInput[];
    id?: Prisma.StringFilter<"Subscription"> | string;
    professionalId?: Prisma.StringFilter<"Subscription"> | string;
    plan?: Prisma.EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.DateTimeNullableFilter<"Subscription"> | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    asaasSubscriptionId?: Prisma.StringNullableFilter<"Subscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    payments?: Prisma.PaymentListRelationFilter;
};
export type SubscriptionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    trialEndsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentPeriodStart?: Prisma.SortOrder;
    currentPeriodEnd?: Prisma.SortOrder;
    asaasSubscriptionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    professionalId?: string;
    AND?: Prisma.SubscriptionWhereInput | Prisma.SubscriptionWhereInput[];
    OR?: Prisma.SubscriptionWhereInput[];
    NOT?: Prisma.SubscriptionWhereInput | Prisma.SubscriptionWhereInput[];
    plan?: Prisma.EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.DateTimeNullableFilter<"Subscription"> | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    asaasSubscriptionId?: Prisma.StringNullableFilter<"Subscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    payments?: Prisma.PaymentListRelationFilter;
}, "id" | "professionalId">;
export type SubscriptionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    trialEndsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    currentPeriodStart?: Prisma.SortOrder;
    currentPeriodEnd?: Prisma.SortOrder;
    asaasSubscriptionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SubscriptionCountOrderByAggregateInput;
    _max?: Prisma.SubscriptionMaxOrderByAggregateInput;
    _min?: Prisma.SubscriptionMinOrderByAggregateInput;
};
export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubscriptionScalarWhereWithAggregatesInput | Prisma.SubscriptionScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubscriptionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubscriptionScalarWhereWithAggregatesInput | Prisma.SubscriptionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Subscription"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"Subscription"> | string;
    plan?: Prisma.EnumSubscriptionPlanWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusWithAggregatesFilter<"Subscription"> | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeWithAggregatesFilter<"Subscription"> | Date | string;
    currentPeriodEnd?: Prisma.DateTimeWithAggregatesFilter<"Subscription"> | Date | string;
    asaasSubscriptionId?: Prisma.StringNullableWithAggregatesFilter<"Subscription"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Subscription"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Subscription"> | Date | string;
};
export type SubscriptionCreateInput = {
    id?: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutSubscriptionsInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutSubscriptionInput;
};
export type SubscriptionUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutSubscriptionInput;
};
export type SubscriptionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutSubscriptionsNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutSubscriptionNestedInput;
};
export type SubscriptionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput;
};
export type SubscriptionCreateManyInput = {
    id?: string;
    professionalId: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubscriptionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionListRelationFilter = {
    every?: Prisma.SubscriptionWhereInput;
    some?: Prisma.SubscriptionWhereInput;
    none?: Prisma.SubscriptionWhereInput;
};
export type SubscriptionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubscriptionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    trialEndsAt?: Prisma.SortOrder;
    currentPeriodStart?: Prisma.SortOrder;
    currentPeriodEnd?: Prisma.SortOrder;
    asaasSubscriptionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    trialEndsAt?: Prisma.SortOrder;
    currentPeriodStart?: Prisma.SortOrder;
    currentPeriodEnd?: Prisma.SortOrder;
    asaasSubscriptionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    plan?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    trialEndsAt?: Prisma.SortOrder;
    currentPeriodStart?: Prisma.SortOrder;
    currentPeriodEnd?: Prisma.SortOrder;
    asaasSubscriptionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SubscriptionScalarRelationFilter = {
    is?: Prisma.SubscriptionWhereInput;
    isNot?: Prisma.SubscriptionWhereInput;
};
export type SubscriptionCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput> | Prisma.SubscriptionCreateWithoutProfessionalInput[] | Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput | Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.SubscriptionCreateManyProfessionalInputEnvelope;
    connect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
};
export type SubscriptionUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput> | Prisma.SubscriptionCreateWithoutProfessionalInput[] | Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput | Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.SubscriptionCreateManyProfessionalInputEnvelope;
    connect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
};
export type SubscriptionUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput> | Prisma.SubscriptionCreateWithoutProfessionalInput[] | Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput | Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.SubscriptionUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.SubscriptionUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.SubscriptionCreateManyProfessionalInputEnvelope;
    set?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    disconnect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    delete?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    connect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    update?: Prisma.SubscriptionUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.SubscriptionUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.SubscriptionUpdateManyWithWhereWithoutProfessionalInput | Prisma.SubscriptionUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.SubscriptionScalarWhereInput | Prisma.SubscriptionScalarWhereInput[];
};
export type SubscriptionUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput> | Prisma.SubscriptionCreateWithoutProfessionalInput[] | Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput | Prisma.SubscriptionCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.SubscriptionUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.SubscriptionUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.SubscriptionCreateManyProfessionalInputEnvelope;
    set?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    disconnect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    delete?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    connect?: Prisma.SubscriptionWhereUniqueInput | Prisma.SubscriptionWhereUniqueInput[];
    update?: Prisma.SubscriptionUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.SubscriptionUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.SubscriptionUpdateManyWithWhereWithoutProfessionalInput | Prisma.SubscriptionUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.SubscriptionScalarWhereInput | Prisma.SubscriptionScalarWhereInput[];
};
export type EnumSubscriptionPlanFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionPlan;
};
export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus;
};
export type SubscriptionCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutPaymentsInput, Prisma.SubscriptionUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.SubscriptionWhereUniqueInput;
};
export type SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.SubscriptionCreateWithoutPaymentsInput, Prisma.SubscriptionUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.SubscriptionCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.SubscriptionUpsertWithoutPaymentsInput;
    connect?: Prisma.SubscriptionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SubscriptionUpdateToOneWithWhereWithoutPaymentsInput, Prisma.SubscriptionUpdateWithoutPaymentsInput>, Prisma.SubscriptionUncheckedUpdateWithoutPaymentsInput>;
};
export type SubscriptionCreateWithoutProfessionalInput = {
    id?: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentCreateNestedManyWithoutSubscriptionInput;
};
export type SubscriptionUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutSubscriptionInput;
};
export type SubscriptionCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.SubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput>;
};
export type SubscriptionCreateManyProfessionalInputEnvelope = {
    data: Prisma.SubscriptionCreateManyProfessionalInput | Prisma.SubscriptionCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type SubscriptionUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.SubscriptionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubscriptionUpdateWithoutProfessionalInput, Prisma.SubscriptionUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.SubscriptionCreateWithoutProfessionalInput, Prisma.SubscriptionUncheckedCreateWithoutProfessionalInput>;
};
export type SubscriptionUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.SubscriptionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubscriptionUpdateWithoutProfessionalInput, Prisma.SubscriptionUncheckedUpdateWithoutProfessionalInput>;
};
export type SubscriptionUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.SubscriptionScalarWhereInput;
    data: Prisma.XOR<Prisma.SubscriptionUpdateManyMutationInput, Prisma.SubscriptionUncheckedUpdateManyWithoutProfessionalInput>;
};
export type SubscriptionScalarWhereInput = {
    AND?: Prisma.SubscriptionScalarWhereInput | Prisma.SubscriptionScalarWhereInput[];
    OR?: Prisma.SubscriptionScalarWhereInput[];
    NOT?: Prisma.SubscriptionScalarWhereInput | Prisma.SubscriptionScalarWhereInput[];
    id?: Prisma.StringFilter<"Subscription"> | string;
    professionalId?: Prisma.StringFilter<"Subscription"> | string;
    plan?: Prisma.EnumSubscriptionPlanFilter<"Subscription"> | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFilter<"Subscription"> | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.DateTimeNullableFilter<"Subscription"> | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    asaasSubscriptionId?: Prisma.StringNullableFilter<"Subscription"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Subscription"> | Date | string;
};
export type SubscriptionCreateWithoutPaymentsInput = {
    id?: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutSubscriptionsInput;
};
export type SubscriptionUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    professionalId: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubscriptionCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.SubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionCreateWithoutPaymentsInput, Prisma.SubscriptionUncheckedCreateWithoutPaymentsInput>;
};
export type SubscriptionUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.SubscriptionUpdateWithoutPaymentsInput, Prisma.SubscriptionUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.SubscriptionCreateWithoutPaymentsInput, Prisma.SubscriptionUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.SubscriptionWhereInput;
};
export type SubscriptionUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.SubscriptionWhereInput;
    data: Prisma.XOR<Prisma.SubscriptionUpdateWithoutPaymentsInput, Prisma.SubscriptionUncheckedUpdateWithoutPaymentsInput>;
};
export type SubscriptionUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutSubscriptionsNestedInput;
};
export type SubscriptionUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionCreateManyProfessionalInput = {
    id?: string;
    plan: $Enums.SubscriptionPlan;
    status?: $Enums.SubscriptionStatus;
    trialEndsAt?: Date | string | null;
    currentPeriodStart: Date | string;
    currentPeriodEnd: Date | string;
    asaasSubscriptionId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SubscriptionUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUpdateManyWithoutSubscriptionNestedInput;
};
export type SubscriptionUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput;
};
export type SubscriptionUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plan?: Prisma.EnumSubscriptionPlanFieldUpdateOperationsInput | $Enums.SubscriptionPlan;
    status?: Prisma.EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus;
    trialEndsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    currentPeriodStart?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentPeriodEnd?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    asaasSubscriptionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscriptionCountOutputType = {
    payments: number;
};
export type SubscriptionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | SubscriptionCountOutputTypeCountPaymentsArgs;
};
export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionCountOutputTypeSelect<ExtArgs> | null;
};
export type SubscriptionCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type SubscriptionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    plan?: boolean;
    status?: boolean;
    trialEndsAt?: boolean;
    currentPeriodStart?: boolean;
    currentPeriodEnd?: boolean;
    asaasSubscriptionId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.Subscription$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubscriptionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscription"]>;
export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    plan?: boolean;
    status?: boolean;
    trialEndsAt?: boolean;
    currentPeriodStart?: boolean;
    currentPeriodEnd?: boolean;
    asaasSubscriptionId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscription"]>;
export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    plan?: boolean;
    status?: boolean;
    trialEndsAt?: boolean;
    currentPeriodStart?: boolean;
    currentPeriodEnd?: boolean;
    asaasSubscriptionId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscription"]>;
export type SubscriptionSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    plan?: boolean;
    status?: boolean;
    trialEndsAt?: boolean;
    currentPeriodStart?: boolean;
    currentPeriodEnd?: boolean;
    asaasSubscriptionId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SubscriptionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "plan" | "status" | "trialEndsAt" | "currentPeriodStart" | "currentPeriodEnd" | "asaasSubscriptionId" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>;
export type SubscriptionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.Subscription$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.SubscriptionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $SubscriptionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Subscription";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
        payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        plan: $Enums.SubscriptionPlan;
        status: $Enums.SubscriptionStatus;
        trialEndsAt: Date | null;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        asaasSubscriptionId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["subscription"]>;
    composites: {};
};
export type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload, S>;
export type SubscriptionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubscriptionCountAggregateInputType | true;
};
export interface SubscriptionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Subscription'];
        meta: {
            name: 'Subscription';
        };
    };
    findUnique<T extends SubscriptionFindUniqueArgs>(args: Prisma.SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SubscriptionFindFirstArgs>(args?: Prisma.SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SubscriptionFindManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SubscriptionCreateArgs>(args: Prisma.SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SubscriptionCreateManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SubscriptionDeleteArgs>(args: Prisma.SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SubscriptionUpdateArgs>(args: Prisma.SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SubscriptionUpdateManyArgs>(args: Prisma.SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SubscriptionUpsertArgs>(args: Prisma.SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SubscriptionCountArgs>(args?: Prisma.Subset<T, SubscriptionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubscriptionCountAggregateOutputType> : number>;
    aggregate<T extends SubscriptionAggregateArgs>(args: Prisma.Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>;
    groupBy<T extends SubscriptionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubscriptionGroupByArgs['orderBy'];
    } : {
        orderBy?: SubscriptionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SubscriptionFieldRefs;
}
export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.Subscription$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Subscription$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SubscriptionFieldRefs {
    readonly id: Prisma.FieldRef<"Subscription", 'String'>;
    readonly professionalId: Prisma.FieldRef<"Subscription", 'String'>;
    readonly plan: Prisma.FieldRef<"Subscription", 'SubscriptionPlan'>;
    readonly status: Prisma.FieldRef<"Subscription", 'SubscriptionStatus'>;
    readonly trialEndsAt: Prisma.FieldRef<"Subscription", 'DateTime'>;
    readonly currentPeriodStart: Prisma.FieldRef<"Subscription", 'DateTime'>;
    readonly currentPeriodEnd: Prisma.FieldRef<"Subscription", 'DateTime'>;
    readonly asaasSubscriptionId: Prisma.FieldRef<"Subscription", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Subscription", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Subscription", 'DateTime'>;
}
export type SubscriptionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where: Prisma.SubscriptionWhereUniqueInput;
};
export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where: Prisma.SubscriptionWhereUniqueInput;
};
export type SubscriptionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithRelationInput | Prisma.SubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionScalarFieldEnum | Prisma.SubscriptionScalarFieldEnum[];
};
export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithRelationInput | Prisma.SubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionScalarFieldEnum | Prisma.SubscriptionScalarFieldEnum[];
};
export type SubscriptionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionWhereInput;
    orderBy?: Prisma.SubscriptionOrderByWithRelationInput | Prisma.SubscriptionOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionScalarFieldEnum | Prisma.SubscriptionScalarFieldEnum[];
};
export type SubscriptionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionCreateInput, Prisma.SubscriptionUncheckedCreateInput>;
};
export type SubscriptionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SubscriptionCreateManyInput | Prisma.SubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    data: Prisma.SubscriptionCreateManyInput | Prisma.SubscriptionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SubscriptionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionUpdateInput, Prisma.SubscriptionUncheckedUpdateInput>;
    where: Prisma.SubscriptionWhereUniqueInput;
};
export type SubscriptionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SubscriptionUpdateManyMutationInput, Prisma.SubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.SubscriptionWhereInput;
    limit?: number;
};
export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscriptionUpdateManyMutationInput, Prisma.SubscriptionUncheckedUpdateManyInput>;
    where?: Prisma.SubscriptionWhereInput;
    limit?: number;
    include?: Prisma.SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SubscriptionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where: Prisma.SubscriptionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscriptionCreateInput, Prisma.SubscriptionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SubscriptionUpdateInput, Prisma.SubscriptionUncheckedUpdateInput>;
};
export type SubscriptionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
    where: Prisma.SubscriptionWhereUniqueInput;
};
export type SubscriptionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionWhereInput;
    limit?: number;
};
export type Subscription$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type SubscriptionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscriptionSelect<ExtArgs> | null;
    omit?: Prisma.SubscriptionOmit<ExtArgs> | null;
    include?: Prisma.SubscriptionInclude<ExtArgs> | null;
};
