import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditLogPayload>;
export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type AuditLogMinAggregateOutputType = {
    id: string | null;
    actorId: string | null;
    actorType: string | null;
    resourceType: string | null;
    resourceId: string | null;
    action: string | null;
    ipAddress: string | null;
    createdAt: Date | null;
};
export type AuditLogMaxAggregateOutputType = {
    id: string | null;
    actorId: string | null;
    actorType: string | null;
    resourceType: string | null;
    resourceId: string | null;
    action: string | null;
    ipAddress: string | null;
    createdAt: Date | null;
};
export type AuditLogCountAggregateOutputType = {
    id: number;
    actorId: number;
    actorType: number;
    resourceType: number;
    resourceId: number;
    action: number;
    oldValue: number;
    newValue: number;
    ipAddress: number;
    createdAt: number;
    _all: number;
};
export type AuditLogMinAggregateInputType = {
    id?: true;
    actorId?: true;
    actorType?: true;
    resourceType?: true;
    resourceId?: true;
    action?: true;
    ipAddress?: true;
    createdAt?: true;
};
export type AuditLogMaxAggregateInputType = {
    id?: true;
    actorId?: true;
    actorType?: true;
    resourceType?: true;
    resourceId?: true;
    action?: true;
    ipAddress?: true;
    createdAt?: true;
};
export type AuditLogCountAggregateInputType = {
    id?: true;
    actorId?: true;
    actorType?: true;
    resourceType?: true;
    resourceId?: true;
    action?: true;
    oldValue?: true;
    newValue?: true;
    ipAddress?: true;
    createdAt?: true;
    _all?: true;
};
export type AuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditLogCountAggregateInputType;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateAuditLog[P]>;
};
export type AuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithAggregationInput | Prisma.AuditLogOrderByWithAggregationInput[];
    by: Prisma.AuditLogScalarFieldEnum[] | Prisma.AuditLogScalarFieldEnum;
    having?: Prisma.AuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditLogCountAggregateInputType | true;
    _min?: AuditLogMinAggregateInputType;
    _max?: AuditLogMaxAggregateInputType;
};
export type AuditLogGroupByOutputType = {
    id: string;
    actorId: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue: runtime.JsonValue | null;
    newValue: runtime.JsonValue | null;
    ipAddress: string | null;
    createdAt: Date;
    _count: AuditLogCountAggregateOutputType | null;
    _min: AuditLogMinAggregateOutputType | null;
    _max: AuditLogMaxAggregateOutputType | null;
};
export type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditLogGroupByOutputType[P]>;
}>>;
export type AuditLogWhereInput = {
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    actorId?: Prisma.StringFilter<"AuditLog"> | string;
    actorType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceId?: Prisma.StringFilter<"AuditLog"> | string;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    oldValue?: Prisma.JsonNullableFilter<"AuditLog">;
    newValue?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
};
export type AuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
};
export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    OR?: Prisma.AuditLogWhereInput[];
    NOT?: Prisma.AuditLogWhereInput | Prisma.AuditLogWhereInput[];
    actorId?: Prisma.StringFilter<"AuditLog"> | string;
    actorType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceId?: Prisma.StringFilter<"AuditLog"> | string;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    oldValue?: Prisma.JsonNullableFilter<"AuditLog">;
    newValue?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
}, "id">;
export type AuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    newValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    ipAddress?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuditLogCountOrderByAggregateInput;
    _max?: Prisma.AuditLogMaxOrderByAggregateInput;
    _min?: Prisma.AuditLogMinOrderByAggregateInput;
};
export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditLogScalarWhereWithAggregatesInput | Prisma.AuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    actorId?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    actorType?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    resourceType?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    resourceId?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    action?: Prisma.StringWithAggregatesFilter<"AuditLog"> | string;
    oldValue?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    newValue?: Prisma.JsonNullableWithAggregatesFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableWithAggregatesFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateInput = {
    id?: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutAuditLogsInput;
};
export type AuditLogUncheckedCreateInput = {
    id?: string;
    actorId: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutAuditLogsNestedInput;
};
export type AuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogCreateManyInput = {
    id?: string;
    actorId: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogListRelationFilter = {
    every?: Prisma.AuditLogWhereInput;
    some?: Prisma.AuditLogWhereInput;
    none?: Prisma.AuditLogWhereInput;
};
export type AuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    oldValue?: Prisma.SortOrder;
    newValue?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    resourceType?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    ipAddress?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditLogCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput> | Prisma.AuditLogCreateWithoutProfessionalInput[] | Prisma.AuditLogUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutProfessionalInput | Prisma.AuditLogCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AuditLogCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput> | Prisma.AuditLogCreateWithoutProfessionalInput[] | Prisma.AuditLogUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutProfessionalInput | Prisma.AuditLogCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AuditLogCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
};
export type AuditLogUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput> | Prisma.AuditLogCreateWithoutProfessionalInput[] | Prisma.AuditLogUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutProfessionalInput | Prisma.AuditLogCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AuditLogCreateManyProfessionalInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutProfessionalInput | Prisma.AuditLogUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput> | Prisma.AuditLogCreateWithoutProfessionalInput[] | Prisma.AuditLogUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AuditLogCreateOrConnectWithoutProfessionalInput | Prisma.AuditLogCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AuditLogUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AuditLogUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AuditLogCreateManyProfessionalInputEnvelope;
    set?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    disconnect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    delete?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    connect?: Prisma.AuditLogWhereUniqueInput | Prisma.AuditLogWhereUniqueInput[];
    update?: Prisma.AuditLogUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AuditLogUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AuditLogUpdateManyWithWhereWithoutProfessionalInput | Prisma.AuditLogUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
};
export type AuditLogCreateWithoutProfessionalInput = {
    id?: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type AuditLogCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput>;
};
export type AuditLogCreateManyProfessionalInputEnvelope = {
    data: Prisma.AuditLogCreateManyProfessionalInput | Prisma.AuditLogCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type AuditLogUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditLogUpdateWithoutProfessionalInput, Prisma.AuditLogUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.AuditLogCreateWithoutProfessionalInput, Prisma.AuditLogUncheckedCreateWithoutProfessionalInput>;
};
export type AuditLogUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateWithoutProfessionalInput, Prisma.AuditLogUncheckedUpdateWithoutProfessionalInput>;
};
export type AuditLogUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.AuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyWithoutProfessionalInput>;
};
export type AuditLogScalarWhereInput = {
    AND?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    OR?: Prisma.AuditLogScalarWhereInput[];
    NOT?: Prisma.AuditLogScalarWhereInput | Prisma.AuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditLog"> | string;
    actorId?: Prisma.StringFilter<"AuditLog"> | string;
    actorType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceType?: Prisma.StringFilter<"AuditLog"> | string;
    resourceId?: Prisma.StringFilter<"AuditLog"> | string;
    action?: Prisma.StringFilter<"AuditLog"> | string;
    oldValue?: Prisma.JsonNullableFilter<"AuditLog">;
    newValue?: Prisma.JsonNullableFilter<"AuditLog">;
    ipAddress?: Prisma.StringNullableFilter<"AuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AuditLog"> | Date | string;
};
export type AuditLogCreateManyProfessionalInput = {
    id?: string;
    actorType: string;
    resourceType: string;
    resourceId: string;
    action: string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: string | null;
    createdAt?: Date | string;
};
export type AuditLogUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceType?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    oldValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    newValue?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    ipAddress?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    actorType?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    action?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    actorType?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    action?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    actorId?: boolean;
    actorType?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    action?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditLog"]>;
export type AuditLogSelectScalar = {
    id?: boolean;
    actorId?: boolean;
    actorType?: boolean;
    resourceType?: boolean;
    resourceId?: boolean;
    action?: boolean;
    oldValue?: boolean;
    newValue?: boolean;
    ipAddress?: boolean;
    createdAt?: boolean;
};
export type AuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "actorId" | "actorType" | "resourceType" | "resourceId" | "action" | "oldValue" | "newValue" | "ipAddress" | "createdAt", ExtArgs["result"]["auditLog"]>;
export type AuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $AuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditLog";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        actorId: string;
        actorType: string;
        resourceType: string;
        resourceId: string;
        action: string;
        oldValue: runtime.JsonValue | null;
        newValue: runtime.JsonValue | null;
        ipAddress: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["auditLog"]>;
    composites: {};
};
export type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditLogPayload, S>;
export type AuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditLogCountAggregateInputType | true;
};
export interface AuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'];
        meta: {
            name: 'AuditLog';
        };
    };
    findUnique<T extends AuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditLogCreateArgs>(args: Prisma.SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuditLogDeleteArgs>(args: Prisma.SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditLogUpdateArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuditLogUpsertArgs>(args: Prisma.SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditLogClient<runtime.Types.Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditLogCountArgs>(args?: Prisma.Subset<T, AuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditLogCountAggregateOutputType> : number>;
    aggregate<T extends AuditLogAggregateArgs>(args: Prisma.Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>;
    groupBy<T extends AuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditLogFieldRefs;
}
export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly actorId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly actorType: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly resourceType: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly resourceId: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly action: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly oldValue: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly newValue: Prisma.FieldRef<"AuditLog", 'Json'>;
    readonly ipAddress: Prisma.FieldRef<"AuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AuditLog", 'DateTime'>;
}
export type AuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where?: Prisma.AuditLogWhereInput;
    orderBy?: Prisma.AuditLogOrderByWithRelationInput | Prisma.AuditLogOrderByWithRelationInput[];
    cursor?: Prisma.AuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditLogScalarFieldEnum | Prisma.AuditLogScalarFieldEnum[];
};
export type AuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
};
export type AuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    data: Prisma.AuditLogCreateManyInput | Prisma.AuditLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuditLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditLogUpdateManyMutationInput, Prisma.AuditLogUncheckedUpdateManyInput>;
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
    include?: Prisma.AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditLogCreateInput, Prisma.AuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditLogUpdateInput, Prisma.AuditLogUncheckedUpdateInput>;
};
export type AuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
    where: Prisma.AuditLogWhereUniqueInput;
};
export type AuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditLogWhereInput;
    limit?: number;
};
export type AuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditLogSelect<ExtArgs> | null;
    omit?: Prisma.AuditLogOmit<ExtArgs> | null;
    include?: Prisma.AuditLogInclude<ExtArgs> | null;
};
