import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentPayload>;
export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type PaymentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PaymentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type PaymentMinAggregateOutputType = {
    id: string | null;
    subscriptionId: string | null;
    asaasPaymentId: string | null;
    amount: runtime.Decimal | null;
    method: $Enums.PaymentMethod | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type PaymentMaxAggregateOutputType = {
    id: string | null;
    subscriptionId: string | null;
    asaasPaymentId: string | null;
    amount: runtime.Decimal | null;
    method: $Enums.PaymentMethod | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type PaymentCountAggregateOutputType = {
    id: number;
    subscriptionId: number;
    asaasPaymentId: number;
    amount: number;
    method: number;
    status: number;
    paidAt: number;
    createdAt: number;
    _all: number;
};
export type PaymentAvgAggregateInputType = {
    amount?: true;
};
export type PaymentSumAggregateInputType = {
    amount?: true;
};
export type PaymentMinAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    asaasPaymentId?: true;
    amount?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
};
export type PaymentMaxAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    asaasPaymentId?: true;
    amount?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
};
export type PaymentCountAggregateInputType = {
    id?: true;
    subscriptionId?: true;
    asaasPaymentId?: true;
    amount?: true;
    method?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentCountAggregateInputType;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayment[P]> : Prisma.GetScalarType<T[P], AggregatePayment[P]>;
};
export type PaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithAggregationInput | Prisma.PaymentOrderByWithAggregationInput[];
    by: Prisma.PaymentScalarFieldEnum[] | Prisma.PaymentScalarFieldEnum;
    having?: Prisma.PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type PaymentGroupByOutputType = {
    id: string;
    subscriptionId: string;
    asaasPaymentId: string;
    amount: runtime.Decimal;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>;
}>>;
export type PaymentWhereInput = {
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    id?: Prisma.StringFilter<"Payment"> | string;
    subscriptionId?: Prisma.StringFilter<"Payment"> | string;
    asaasPaymentId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    subscription?: Prisma.XOR<Prisma.SubscriptionScalarRelationFilter, Prisma.SubscriptionWhereInput>;
};
export type PaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    asaasPaymentId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    subscription?: Prisma.SubscriptionOrderByWithRelationInput;
};
export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    asaasPaymentId?: string;
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    subscriptionId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    subscription?: Prisma.XOR<Prisma.SubscriptionScalarRelationFilter, Prisma.SubscriptionWhereInput>;
}, "id" | "asaasPaymentId">;
export type PaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    asaasPaymentId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PaymentCountOrderByAggregateInput;
    _avg?: Prisma.PaymentAvgOrderByAggregateInput;
    _max?: Prisma.PaymentMaxOrderByAggregateInput;
    _min?: Prisma.PaymentMinOrderByAggregateInput;
    _sum?: Prisma.PaymentSumOrderByAggregateInput;
};
export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    subscriptionId?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    asaasPaymentId?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string;
};
export type PaymentCreateInput = {
    id?: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    subscription: Prisma.SubscriptionCreateNestedOneWithoutPaymentsInput;
};
export type PaymentUncheckedCreateInput = {
    id?: string;
    subscriptionId: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscription?: Prisma.SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type PaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentCreateManyInput = {
    id?: string;
    subscriptionId: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    subscriptionId?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentListRelationFilter = {
    every?: Prisma.PaymentWhereInput;
    some?: Prisma.PaymentWhereInput;
    none?: Prisma.PaymentWhereInput;
};
export type PaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    asaasPaymentId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    asaasPaymentId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    subscriptionId?: Prisma.SortOrder;
    asaasPaymentId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput> | Prisma.PaymentCreateWithoutSubscriptionInput[] | Prisma.PaymentUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSubscriptionInput | Prisma.PaymentCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.PaymentCreateManySubscriptionInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput> | Prisma.PaymentCreateWithoutSubscriptionInput[] | Prisma.PaymentUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSubscriptionInput | Prisma.PaymentCreateOrConnectWithoutSubscriptionInput[];
    createMany?: Prisma.PaymentCreateManySubscriptionInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput> | Prisma.PaymentCreateWithoutSubscriptionInput[] | Prisma.PaymentUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSubscriptionInput | Prisma.PaymentCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.PaymentCreateManySubscriptionInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutSubscriptionInput | Prisma.PaymentUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput> | Prisma.PaymentCreateWithoutSubscriptionInput[] | Prisma.PaymentUncheckedCreateWithoutSubscriptionInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutSubscriptionInput | Prisma.PaymentCreateOrConnectWithoutSubscriptionInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | Prisma.PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[];
    createMany?: Prisma.PaymentCreateManySubscriptionInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | Prisma.PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutSubscriptionInput | Prisma.PaymentUpdateManyWithWhereWithoutSubscriptionInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod;
};
export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
};
export type PaymentCreateWithoutSubscriptionInput = {
    id?: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentUncheckedCreateWithoutSubscriptionInput = {
    id?: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutSubscriptionInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput>;
};
export type PaymentCreateManySubscriptionInputEnvelope = {
    data: Prisma.PaymentCreateManySubscriptionInput | Prisma.PaymentCreateManySubscriptionInput[];
    skipDuplicates?: boolean;
};
export type PaymentUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutSubscriptionInput, Prisma.PaymentUncheckedUpdateWithoutSubscriptionInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutSubscriptionInput, Prisma.PaymentUncheckedCreateWithoutSubscriptionInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutSubscriptionInput, Prisma.PaymentUncheckedUpdateWithoutSubscriptionInput>;
};
export type PaymentUpdateManyWithWhereWithoutSubscriptionInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutSubscriptionInput>;
};
export type PaymentScalarWhereInput = {
    AND?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    OR?: Prisma.PaymentScalarWhereInput[];
    NOT?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    id?: Prisma.StringFilter<"Payment"> | string;
    subscriptionId?: Prisma.StringFilter<"Payment"> | string;
    asaasPaymentId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.DecimalFilter<"Payment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
};
export type PaymentCreateManySubscriptionInput = {
    id?: string;
    asaasPaymentId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    method: $Enums.PaymentMethod;
    status: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    asaasPaymentId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    method?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    asaasPaymentId?: boolean;
    amount?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    asaasPaymentId?: boolean;
    amount?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    subscriptionId?: boolean;
    asaasPaymentId?: boolean;
    amount?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectScalar = {
    id?: boolean;
    subscriptionId?: boolean;
    asaasPaymentId?: boolean;
    amount?: boolean;
    method?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
};
export type PaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "subscriptionId" | "asaasPaymentId" | "amount" | "method" | "status" | "paidAt" | "createdAt", ExtArgs["result"]["payment"]>;
export type PaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
};
export type PaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
};
export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    subscription?: boolean | Prisma.SubscriptionDefaultArgs<ExtArgs>;
};
export type $PaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Payment";
    objects: {
        subscription: Prisma.$SubscriptionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        subscriptionId: string;
        asaasPaymentId: string;
        amount: runtime.Decimal;
        method: $Enums.PaymentMethod;
        status: $Enums.PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["payment"]>;
    composites: {};
};
export type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentPayload, S>;
export type PaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentCountAggregateInputType | true;
};
export interface PaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Payment'];
        meta: {
            name: 'Payment';
        };
    };
    findUnique<T extends PaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentCreateArgs>(args: Prisma.SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentDeleteArgs>(args: Prisma.SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentUpdateArgs>(args: Prisma.SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentUpsertArgs>(args: Prisma.SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentCountArgs>(args?: Prisma.Subset<T, PaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentCountAggregateOutputType> : number>;
    aggregate<T extends PaymentAggregateArgs>(args: Prisma.Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;
    groupBy<T extends PaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentFieldRefs;
}
export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    subscription<T extends Prisma.SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SubscriptionDefaultArgs<ExtArgs>>): Prisma.Prisma__SubscriptionClient<runtime.Types.Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentFieldRefs {
    readonly id: Prisma.FieldRef<"Payment", 'String'>;
    readonly subscriptionId: Prisma.FieldRef<"Payment", 'String'>;
    readonly asaasPaymentId: Prisma.FieldRef<"Payment", 'String'>;
    readonly amount: Prisma.FieldRef<"Payment", 'Decimal'>;
    readonly method: Prisma.FieldRef<"Payment", 'PaymentMethod'>;
    readonly status: Prisma.FieldRef<"Payment", 'PaymentStatus'>;
    readonly paidAt: Prisma.FieldRef<"Payment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Payment", 'DateTime'>;
}
export type PaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
};
export type PaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type PaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
    include?: Prisma.PaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
};
export type PaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type PaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
};
