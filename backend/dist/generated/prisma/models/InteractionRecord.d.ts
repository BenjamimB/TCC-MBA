import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type InteractionRecordModel = runtime.Types.Result.DefaultSelection<Prisma.$InteractionRecordPayload>;
export type AggregateInteractionRecord = {
    _count: InteractionRecordCountAggregateOutputType | null;
    _min: InteractionRecordMinAggregateOutputType | null;
    _max: InteractionRecordMaxAggregateOutputType | null;
};
export type InteractionRecordMinAggregateOutputType = {
    id: string | null;
    patientId: string | null;
    professionalId: string | null;
    type: string | null;
    content: string | null;
    createdAt: Date | null;
};
export type InteractionRecordMaxAggregateOutputType = {
    id: string | null;
    patientId: string | null;
    professionalId: string | null;
    type: string | null;
    content: string | null;
    createdAt: Date | null;
};
export type InteractionRecordCountAggregateOutputType = {
    id: number;
    patientId: number;
    professionalId: number;
    type: number;
    content: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type InteractionRecordMinAggregateInputType = {
    id?: true;
    patientId?: true;
    professionalId?: true;
    type?: true;
    content?: true;
    createdAt?: true;
};
export type InteractionRecordMaxAggregateInputType = {
    id?: true;
    patientId?: true;
    professionalId?: true;
    type?: true;
    content?: true;
    createdAt?: true;
};
export type InteractionRecordCountAggregateInputType = {
    id?: true;
    patientId?: true;
    professionalId?: true;
    type?: true;
    content?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type InteractionRecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InteractionRecordWhereInput;
    orderBy?: Prisma.InteractionRecordOrderByWithRelationInput | Prisma.InteractionRecordOrderByWithRelationInput[];
    cursor?: Prisma.InteractionRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InteractionRecordCountAggregateInputType;
    _min?: InteractionRecordMinAggregateInputType;
    _max?: InteractionRecordMaxAggregateInputType;
};
export type GetInteractionRecordAggregateType<T extends InteractionRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateInteractionRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInteractionRecord[P]> : Prisma.GetScalarType<T[P], AggregateInteractionRecord[P]>;
};
export type InteractionRecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InteractionRecordWhereInput;
    orderBy?: Prisma.InteractionRecordOrderByWithAggregationInput | Prisma.InteractionRecordOrderByWithAggregationInput[];
    by: Prisma.InteractionRecordScalarFieldEnum[] | Prisma.InteractionRecordScalarFieldEnum;
    having?: Prisma.InteractionRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InteractionRecordCountAggregateInputType | true;
    _min?: InteractionRecordMinAggregateInputType;
    _max?: InteractionRecordMaxAggregateInputType;
};
export type InteractionRecordGroupByOutputType = {
    id: string;
    patientId: string;
    professionalId: string;
    type: string;
    content: string | null;
    metadata: runtime.JsonValue;
    createdAt: Date;
    _count: InteractionRecordCountAggregateOutputType | null;
    _min: InteractionRecordMinAggregateOutputType | null;
    _max: InteractionRecordMaxAggregateOutputType | null;
};
export type GetInteractionRecordGroupByPayload<T extends InteractionRecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InteractionRecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InteractionRecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InteractionRecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InteractionRecordGroupByOutputType[P]>;
}>>;
export type InteractionRecordWhereInput = {
    AND?: Prisma.InteractionRecordWhereInput | Prisma.InteractionRecordWhereInput[];
    OR?: Prisma.InteractionRecordWhereInput[];
    NOT?: Prisma.InteractionRecordWhereInput | Prisma.InteractionRecordWhereInput[];
    id?: Prisma.StringFilter<"InteractionRecord"> | string;
    patientId?: Prisma.StringFilter<"InteractionRecord"> | string;
    professionalId?: Prisma.StringFilter<"InteractionRecord"> | string;
    type?: Prisma.StringFilter<"InteractionRecord"> | string;
    content?: Prisma.StringNullableFilter<"InteractionRecord"> | string | null;
    metadata?: Prisma.JsonFilter<"InteractionRecord">;
    createdAt?: Prisma.DateTimeFilter<"InteractionRecord"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
};
export type InteractionRecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    patient?: Prisma.PatientOrderByWithRelationInput;
};
export type InteractionRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.InteractionRecordWhereInput | Prisma.InteractionRecordWhereInput[];
    OR?: Prisma.InteractionRecordWhereInput[];
    NOT?: Prisma.InteractionRecordWhereInput | Prisma.InteractionRecordWhereInput[];
    patientId?: Prisma.StringFilter<"InteractionRecord"> | string;
    professionalId?: Prisma.StringFilter<"InteractionRecord"> | string;
    type?: Prisma.StringFilter<"InteractionRecord"> | string;
    content?: Prisma.StringNullableFilter<"InteractionRecord"> | string | null;
    metadata?: Prisma.JsonFilter<"InteractionRecord">;
    createdAt?: Prisma.DateTimeFilter<"InteractionRecord"> | Date | string;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
}, "id">;
export type InteractionRecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InteractionRecordCountOrderByAggregateInput;
    _max?: Prisma.InteractionRecordMaxOrderByAggregateInput;
    _min?: Prisma.InteractionRecordMinOrderByAggregateInput;
};
export type InteractionRecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.InteractionRecordScalarWhereWithAggregatesInput | Prisma.InteractionRecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.InteractionRecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InteractionRecordScalarWhereWithAggregatesInput | Prisma.InteractionRecordScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"InteractionRecord"> | string;
    patientId?: Prisma.StringWithAggregatesFilter<"InteractionRecord"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"InteractionRecord"> | string;
    type?: Prisma.StringWithAggregatesFilter<"InteractionRecord"> | string;
    content?: Prisma.StringNullableWithAggregatesFilter<"InteractionRecord"> | string | null;
    metadata?: Prisma.JsonWithAggregatesFilter<"InteractionRecord">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"InteractionRecord"> | Date | string;
};
export type InteractionRecordCreateInput = {
    id?: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutInteractionRecordsInput;
};
export type InteractionRecordUncheckedCreateInput = {
    id?: string;
    patientId: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type InteractionRecordUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutInteractionRecordsNestedInput;
};
export type InteractionRecordUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordCreateManyInput = {
    id?: string;
    patientId: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type InteractionRecordUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordListRelationFilter = {
    every?: Prisma.InteractionRecordWhereInput;
    some?: Prisma.InteractionRecordWhereInput;
    none?: Prisma.InteractionRecordWhereInput;
};
export type InteractionRecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InteractionRecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InteractionRecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InteractionRecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InteractionRecordCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput> | Prisma.InteractionRecordCreateWithoutPatientInput[] | Prisma.InteractionRecordUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.InteractionRecordCreateOrConnectWithoutPatientInput | Prisma.InteractionRecordCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.InteractionRecordCreateManyPatientInputEnvelope;
    connect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
};
export type InteractionRecordUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput> | Prisma.InteractionRecordCreateWithoutPatientInput[] | Prisma.InteractionRecordUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.InteractionRecordCreateOrConnectWithoutPatientInput | Prisma.InteractionRecordCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.InteractionRecordCreateManyPatientInputEnvelope;
    connect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
};
export type InteractionRecordUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput> | Prisma.InteractionRecordCreateWithoutPatientInput[] | Prisma.InteractionRecordUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.InteractionRecordCreateOrConnectWithoutPatientInput | Prisma.InteractionRecordCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.InteractionRecordUpsertWithWhereUniqueWithoutPatientInput | Prisma.InteractionRecordUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.InteractionRecordCreateManyPatientInputEnvelope;
    set?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    disconnect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    delete?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    connect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    update?: Prisma.InteractionRecordUpdateWithWhereUniqueWithoutPatientInput | Prisma.InteractionRecordUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.InteractionRecordUpdateManyWithWhereWithoutPatientInput | Prisma.InteractionRecordUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.InteractionRecordScalarWhereInput | Prisma.InteractionRecordScalarWhereInput[];
};
export type InteractionRecordUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput> | Prisma.InteractionRecordCreateWithoutPatientInput[] | Prisma.InteractionRecordUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.InteractionRecordCreateOrConnectWithoutPatientInput | Prisma.InteractionRecordCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.InteractionRecordUpsertWithWhereUniqueWithoutPatientInput | Prisma.InteractionRecordUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.InteractionRecordCreateManyPatientInputEnvelope;
    set?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    disconnect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    delete?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    connect?: Prisma.InteractionRecordWhereUniqueInput | Prisma.InteractionRecordWhereUniqueInput[];
    update?: Prisma.InteractionRecordUpdateWithWhereUniqueWithoutPatientInput | Prisma.InteractionRecordUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.InteractionRecordUpdateManyWithWhereWithoutPatientInput | Prisma.InteractionRecordUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.InteractionRecordScalarWhereInput | Prisma.InteractionRecordScalarWhereInput[];
};
export type InteractionRecordCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type InteractionRecordUncheckedCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type InteractionRecordCreateOrConnectWithoutPatientInput = {
    where: Prisma.InteractionRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput>;
};
export type InteractionRecordCreateManyPatientInputEnvelope = {
    data: Prisma.InteractionRecordCreateManyPatientInput | Prisma.InteractionRecordCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type InteractionRecordUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.InteractionRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.InteractionRecordUpdateWithoutPatientInput, Prisma.InteractionRecordUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.InteractionRecordCreateWithoutPatientInput, Prisma.InteractionRecordUncheckedCreateWithoutPatientInput>;
};
export type InteractionRecordUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.InteractionRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.InteractionRecordUpdateWithoutPatientInput, Prisma.InteractionRecordUncheckedUpdateWithoutPatientInput>;
};
export type InteractionRecordUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.InteractionRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.InteractionRecordUpdateManyMutationInput, Prisma.InteractionRecordUncheckedUpdateManyWithoutPatientInput>;
};
export type InteractionRecordScalarWhereInput = {
    AND?: Prisma.InteractionRecordScalarWhereInput | Prisma.InteractionRecordScalarWhereInput[];
    OR?: Prisma.InteractionRecordScalarWhereInput[];
    NOT?: Prisma.InteractionRecordScalarWhereInput | Prisma.InteractionRecordScalarWhereInput[];
    id?: Prisma.StringFilter<"InteractionRecord"> | string;
    patientId?: Prisma.StringFilter<"InteractionRecord"> | string;
    professionalId?: Prisma.StringFilter<"InteractionRecord"> | string;
    type?: Prisma.StringFilter<"InteractionRecord"> | string;
    content?: Prisma.StringNullableFilter<"InteractionRecord"> | string | null;
    metadata?: Prisma.JsonFilter<"InteractionRecord">;
    createdAt?: Prisma.DateTimeFilter<"InteractionRecord"> | Date | string;
};
export type InteractionRecordCreateManyPatientInput = {
    id?: string;
    professionalId: string;
    type: string;
    content?: string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type InteractionRecordUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InteractionRecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    professionalId?: boolean;
    type?: boolean;
    content?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["interactionRecord"]>;
export type InteractionRecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    professionalId?: boolean;
    type?: boolean;
    content?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["interactionRecord"]>;
export type InteractionRecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    patientId?: boolean;
    professionalId?: boolean;
    type?: boolean;
    content?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["interactionRecord"]>;
export type InteractionRecordSelectScalar = {
    id?: boolean;
    patientId?: boolean;
    professionalId?: boolean;
    type?: boolean;
    content?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type InteractionRecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "patientId" | "professionalId" | "type" | "content" | "metadata" | "createdAt", ExtArgs["result"]["interactionRecord"]>;
export type InteractionRecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type InteractionRecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type InteractionRecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $InteractionRecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "InteractionRecord";
    objects: {
        patient: Prisma.$PatientPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        patientId: string;
        professionalId: string;
        type: string;
        content: string | null;
        metadata: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["interactionRecord"]>;
    composites: {};
};
export type InteractionRecordGetPayload<S extends boolean | null | undefined | InteractionRecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload, S>;
export type InteractionRecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InteractionRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InteractionRecordCountAggregateInputType | true;
};
export interface InteractionRecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['InteractionRecord'];
        meta: {
            name: 'InteractionRecord';
        };
    };
    findUnique<T extends InteractionRecordFindUniqueArgs>(args: Prisma.SelectSubset<T, InteractionRecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InteractionRecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InteractionRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InteractionRecordFindFirstArgs>(args?: Prisma.SelectSubset<T, InteractionRecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InteractionRecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InteractionRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InteractionRecordFindManyArgs>(args?: Prisma.SelectSubset<T, InteractionRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InteractionRecordCreateArgs>(args: Prisma.SelectSubset<T, InteractionRecordCreateArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InteractionRecordCreateManyArgs>(args?: Prisma.SelectSubset<T, InteractionRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InteractionRecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InteractionRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InteractionRecordDeleteArgs>(args: Prisma.SelectSubset<T, InteractionRecordDeleteArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InteractionRecordUpdateArgs>(args: Prisma.SelectSubset<T, InteractionRecordUpdateArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InteractionRecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, InteractionRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InteractionRecordUpdateManyArgs>(args: Prisma.SelectSubset<T, InteractionRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InteractionRecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InteractionRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InteractionRecordUpsertArgs>(args: Prisma.SelectSubset<T, InteractionRecordUpsertArgs<ExtArgs>>): Prisma.Prisma__InteractionRecordClient<runtime.Types.Result.GetResult<Prisma.$InteractionRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InteractionRecordCountArgs>(args?: Prisma.Subset<T, InteractionRecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InteractionRecordCountAggregateOutputType> : number>;
    aggregate<T extends InteractionRecordAggregateArgs>(args: Prisma.Subset<T, InteractionRecordAggregateArgs>): Prisma.PrismaPromise<GetInteractionRecordAggregateType<T>>;
    groupBy<T extends InteractionRecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InteractionRecordGroupByArgs['orderBy'];
    } : {
        orderBy?: InteractionRecordGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InteractionRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInteractionRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InteractionRecordFieldRefs;
}
export interface Prisma__InteractionRecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InteractionRecordFieldRefs {
    readonly id: Prisma.FieldRef<"InteractionRecord", 'String'>;
    readonly patientId: Prisma.FieldRef<"InteractionRecord", 'String'>;
    readonly professionalId: Prisma.FieldRef<"InteractionRecord", 'String'>;
    readonly type: Prisma.FieldRef<"InteractionRecord", 'String'>;
    readonly content: Prisma.FieldRef<"InteractionRecord", 'String'>;
    readonly metadata: Prisma.FieldRef<"InteractionRecord", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"InteractionRecord", 'DateTime'>;
}
export type InteractionRecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    where: Prisma.InteractionRecordWhereUniqueInput;
};
export type InteractionRecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    where: Prisma.InteractionRecordWhereUniqueInput;
};
export type InteractionRecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InteractionRecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InteractionRecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InteractionRecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InteractionRecordCreateInput, Prisma.InteractionRecordUncheckedCreateInput>;
};
export type InteractionRecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InteractionRecordCreateManyInput | Prisma.InteractionRecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InteractionRecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    data: Prisma.InteractionRecordCreateManyInput | Prisma.InteractionRecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InteractionRecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InteractionRecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InteractionRecordUpdateInput, Prisma.InteractionRecordUncheckedUpdateInput>;
    where: Prisma.InteractionRecordWhereUniqueInput;
};
export type InteractionRecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InteractionRecordUpdateManyMutationInput, Prisma.InteractionRecordUncheckedUpdateManyInput>;
    where?: Prisma.InteractionRecordWhereInput;
    limit?: number;
};
export type InteractionRecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InteractionRecordUpdateManyMutationInput, Prisma.InteractionRecordUncheckedUpdateManyInput>;
    where?: Prisma.InteractionRecordWhereInput;
    limit?: number;
    include?: Prisma.InteractionRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InteractionRecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    where: Prisma.InteractionRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.InteractionRecordCreateInput, Prisma.InteractionRecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InteractionRecordUpdateInput, Prisma.InteractionRecordUncheckedUpdateInput>;
};
export type InteractionRecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
    where: Prisma.InteractionRecordWhereUniqueInput;
};
export type InteractionRecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InteractionRecordWhereInput;
    limit?: number;
};
export type InteractionRecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InteractionRecordSelect<ExtArgs> | null;
    omit?: Prisma.InteractionRecordOmit<ExtArgs> | null;
    include?: Prisma.InteractionRecordInclude<ExtArgs> | null;
};
