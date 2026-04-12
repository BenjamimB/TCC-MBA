import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ConversationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationPayload>;
export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type ConversationMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    state: $Enums.ConversationState | null;
    pendingSlotId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    patientId: string | null;
    state: $Enums.ConversationState | null;
    pendingSlotId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConversationCountAggregateOutputType = {
    id: number;
    professionalId: number;
    patientId: number;
    state: number;
    collectedData: number;
    pendingSlotId: number;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConversationMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    state?: true;
    pendingSlotId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    state?: true;
    pendingSlotId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConversationCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    patientId?: true;
    state?: true;
    collectedData?: true;
    pendingSlotId?: true;
    expiresAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConversationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationCountAggregateInputType;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
    [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversation[P]> : Prisma.GetScalarType<T[P], AggregateConversation[P]>;
};
export type ConversationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithAggregationInput | Prisma.ConversationOrderByWithAggregationInput[];
    by: Prisma.ConversationScalarFieldEnum[] | Prisma.ConversationScalarFieldEnum;
    having?: Prisma.ConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationCountAggregateInputType | true;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type ConversationGroupByOutputType = {
    id: string;
    professionalId: string;
    patientId: string;
    state: $Enums.ConversationState;
    collectedData: runtime.JsonValue;
    pendingSlotId: string | null;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]>;
}>>;
export type ConversationWhereInput = {
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    professionalId?: Prisma.StringFilter<"Conversation"> | string;
    patientId?: Prisma.StringFilter<"Conversation"> | string;
    state?: Prisma.EnumConversationStateFilter<"Conversation"> | $Enums.ConversationState;
    collectedData?: Prisma.JsonFilter<"Conversation">;
    pendingSlotId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
};
export type ConversationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    collectedData?: Prisma.SortOrder;
    pendingSlotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
    patient?: Prisma.PatientOrderByWithRelationInput;
    messages?: Prisma.MessageOrderByRelationAggregateInput;
};
export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    professionalId?: Prisma.StringFilter<"Conversation"> | string;
    patientId?: Prisma.StringFilter<"Conversation"> | string;
    state?: Prisma.EnumConversationStateFilter<"Conversation"> | $Enums.ConversationState;
    collectedData?: Prisma.JsonFilter<"Conversation">;
    pendingSlotId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
    patient?: Prisma.XOR<Prisma.PatientScalarRelationFilter, Prisma.PatientWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
}, "id">;
export type ConversationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    collectedData?: Prisma.SortOrder;
    pendingSlotId?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConversationCountOrderByAggregateInput;
    _max?: Prisma.ConversationMaxOrderByAggregateInput;
    _min?: Prisma.ConversationMinOrderByAggregateInput;
};
export type ConversationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    patientId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    state?: Prisma.EnumConversationStateWithAggregatesFilter<"Conversation"> | $Enums.ConversationState;
    collectedData?: Prisma.JsonWithAggregatesFilter<"Conversation">;
    pendingSlotId?: Prisma.StringNullableWithAggregatesFilter<"Conversation"> | string | null;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
};
export type ConversationCreateInput = {
    id?: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutConversationsInput;
    patient: Prisma.PatientCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutConversationsNestedInput;
    patient?: Prisma.PatientUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateManyInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationListRelationFilter = {
    every?: Prisma.ConversationWhereInput;
    some?: Prisma.ConversationWhereInput;
    none?: Prisma.ConversationWhereInput;
};
export type ConversationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    collectedData?: Prisma.SortOrder;
    pendingSlotId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    pendingSlotId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    patientId?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    pendingSlotId?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConversationScalarRelationFilter = {
    is?: Prisma.ConversationWhereInput;
    isNot?: Prisma.ConversationWhereInput;
};
export type ConversationCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput> | Prisma.ConversationCreateWithoutProfessionalInput[] | Prisma.ConversationUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProfessionalInput | Prisma.ConversationCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.ConversationCreateManyProfessionalInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput> | Prisma.ConversationCreateWithoutProfessionalInput[] | Prisma.ConversationUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProfessionalInput | Prisma.ConversationCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.ConversationCreateManyProfessionalInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput> | Prisma.ConversationCreateWithoutProfessionalInput[] | Prisma.ConversationUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProfessionalInput | Prisma.ConversationCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.ConversationUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.ConversationCreateManyProfessionalInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.ConversationUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutProfessionalInput | Prisma.ConversationUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput> | Prisma.ConversationCreateWithoutProfessionalInput[] | Prisma.ConversationUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutProfessionalInput | Prisma.ConversationCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.ConversationUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.ConversationCreateManyProfessionalInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.ConversationUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutProfessionalInput | Prisma.ConversationUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput> | Prisma.ConversationCreateWithoutPatientInput[] | Prisma.ConversationUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutPatientInput | Prisma.ConversationCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.ConversationCreateManyPatientInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput> | Prisma.ConversationCreateWithoutPatientInput[] | Prisma.ConversationUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutPatientInput | Prisma.ConversationCreateOrConnectWithoutPatientInput[];
    createMany?: Prisma.ConversationCreateManyPatientInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput> | Prisma.ConversationCreateWithoutPatientInput[] | Prisma.ConversationUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutPatientInput | Prisma.ConversationCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutPatientInput | Prisma.ConversationUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.ConversationCreateManyPatientInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutPatientInput | Prisma.ConversationUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutPatientInput | Prisma.ConversationUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput> | Prisma.ConversationCreateWithoutPatientInput[] | Prisma.ConversationUncheckedCreateWithoutPatientInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutPatientInput | Prisma.ConversationCreateOrConnectWithoutPatientInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutPatientInput | Prisma.ConversationUpsertWithWhereUniqueWithoutPatientInput[];
    createMany?: Prisma.ConversationCreateManyPatientInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutPatientInput | Prisma.ConversationUpdateWithWhereUniqueWithoutPatientInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutPatientInput | Prisma.ConversationUpdateManyWithWhereWithoutPatientInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type EnumConversationStateFieldUpdateOperationsInput = {
    set?: $Enums.ConversationState;
};
export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.ConversationUpsertWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput, Prisma.ConversationUpdateWithoutMessagesInput>, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationCreateWithoutProfessionalInput = {
    id?: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    patient: Prisma.PatientCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    patientId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput>;
};
export type ConversationCreateManyProfessionalInputEnvelope = {
    data: Prisma.ConversationCreateManyProfessionalInput | Prisma.ConversationCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutProfessionalInput, Prisma.ConversationUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutProfessionalInput, Prisma.ConversationUncheckedCreateWithoutProfessionalInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutProfessionalInput, Prisma.ConversationUncheckedUpdateWithoutProfessionalInput>;
};
export type ConversationUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutProfessionalInput>;
};
export type ConversationScalarWhereInput = {
    AND?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    OR?: Prisma.ConversationScalarWhereInput[];
    NOT?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    professionalId?: Prisma.StringFilter<"Conversation"> | string;
    patientId?: Prisma.StringFilter<"Conversation"> | string;
    state?: Prisma.EnumConversationStateFilter<"Conversation"> | $Enums.ConversationState;
    collectedData?: Prisma.JsonFilter<"Conversation">;
    pendingSlotId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    expiresAt?: Prisma.DateTimeNullableFilter<"Conversation"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
};
export type ConversationCreateWithoutPatientInput = {
    id?: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutPatientInput = {
    id?: string;
    professionalId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutPatientInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput>;
};
export type ConversationCreateManyPatientInputEnvelope = {
    data: Prisma.ConversationCreateManyPatientInput | Prisma.ConversationCreateManyPatientInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutPatientInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutPatientInput, Prisma.ConversationUncheckedUpdateWithoutPatientInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutPatientInput, Prisma.ConversationUncheckedCreateWithoutPatientInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutPatientInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutPatientInput, Prisma.ConversationUncheckedUpdateWithoutPatientInput>;
};
export type ConversationUpdateManyWithWhereWithoutPatientInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutPatientInput>;
};
export type ConversationCreateWithoutMessagesInput = {
    id?: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutConversationsInput;
    patient: Prisma.PatientCreateNestedOneWithoutConversationsInput;
};
export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    professionalId: string;
    patientId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
};
export type ConversationUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutConversationsNestedInput;
    patient?: Prisma.PatientUpdateOneRequiredWithoutConversationsNestedInput;
};
export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyProfessionalInput = {
    id?: string;
    patientId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    patient?: Prisma.PatientUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    patientId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyPatientInput = {
    id?: string;
    professionalId: string;
    state?: $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: string | null;
    expiresAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConversationUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutPatientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.EnumConversationStateFieldUpdateOperationsInput | $Enums.ConversationState;
    collectedData?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    pendingSlotId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCountOutputType = {
    messages: number;
};
export type ConversationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs;
};
export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationCountOutputTypeSelect<ExtArgs> | null;
};
export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type ConversationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    state?: boolean;
    collectedData?: boolean;
    pendingSlotId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    state?: boolean;
    collectedData?: boolean;
    pendingSlotId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    state?: boolean;
    collectedData?: boolean;
    pendingSlotId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    patientId?: boolean;
    state?: boolean;
    collectedData?: boolean;
    pendingSlotId?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConversationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "patientId" | "state" | "collectedData" | "pendingSlotId" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>;
export type ConversationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ConversationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
    patient?: boolean | Prisma.PatientDefaultArgs<ExtArgs>;
};
export type $ConversationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Conversation";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
        patient: Prisma.$PatientPayload<ExtArgs>;
        messages: Prisma.$MessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        patientId: string;
        state: $Enums.ConversationState;
        collectedData: runtime.JsonValue;
        pendingSlotId: string | null;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["conversation"]>;
    composites: {};
};
export type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationPayload, S>;
export type ConversationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationCountAggregateInputType | true;
};
export interface ConversationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Conversation'];
        meta: {
            name: 'Conversation';
        };
    };
    findUnique<T extends ConversationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationCreateArgs>(args: Prisma.SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationDeleteArgs>(args: Prisma.SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationUpdateArgs>(args: Prisma.SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationUpsertArgs>(args: Prisma.SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationCountArgs>(args?: Prisma.Subset<T, ConversationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationCountAggregateOutputType> : number>;
    aggregate<T extends ConversationAggregateArgs>(args: Prisma.Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>;
    groupBy<T extends ConversationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationFieldRefs;
}
export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    patient<T extends Prisma.PatientDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PatientDefaultArgs<ExtArgs>>): Prisma.Prisma__PatientClient<runtime.Types.Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.Conversation$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationFieldRefs {
    readonly id: Prisma.FieldRef<"Conversation", 'String'>;
    readonly professionalId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly patientId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly state: Prisma.FieldRef<"Conversation", 'ConversationState'>;
    readonly collectedData: Prisma.FieldRef<"Conversation", 'Json'>;
    readonly pendingSlotId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
}
export type ConversationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
};
export type ConversationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type ConversationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
    include?: Prisma.ConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
};
export type ConversationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type Conversation$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type ConversationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
};
