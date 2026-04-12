import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AvailabilityModel = runtime.Types.Result.DefaultSelection<Prisma.$AvailabilityPayload>;
export type AggregateAvailability = {
    _count: AvailabilityCountAggregateOutputType | null;
    _avg: AvailabilityAvgAggregateOutputType | null;
    _sum: AvailabilitySumAggregateOutputType | null;
    _min: AvailabilityMinAggregateOutputType | null;
    _max: AvailabilityMaxAggregateOutputType | null;
};
export type AvailabilityAvgAggregateOutputType = {
    dayOfWeek: number | null;
    slotDurationMinutes: number | null;
    breakDurationMinutes: number | null;
};
export type AvailabilitySumAggregateOutputType = {
    dayOfWeek: number | null;
    slotDurationMinutes: number | null;
    breakDurationMinutes: number | null;
};
export type AvailabilityMinAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    dayOfWeek: number | null;
    startTime: string | null;
    endTime: string | null;
    slotDurationMinutes: number | null;
    breakDurationMinutes: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AvailabilityMaxAggregateOutputType = {
    id: string | null;
    professionalId: string | null;
    dayOfWeek: number | null;
    startTime: string | null;
    endTime: string | null;
    slotDurationMinutes: number | null;
    breakDurationMinutes: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AvailabilityCountAggregateOutputType = {
    id: number;
    professionalId: number;
    dayOfWeek: number;
    startTime: number;
    endTime: number;
    slotDurationMinutes: number;
    breakDurationMinutes: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AvailabilityAvgAggregateInputType = {
    dayOfWeek?: true;
    slotDurationMinutes?: true;
    breakDurationMinutes?: true;
};
export type AvailabilitySumAggregateInputType = {
    dayOfWeek?: true;
    slotDurationMinutes?: true;
    breakDurationMinutes?: true;
};
export type AvailabilityMinAggregateInputType = {
    id?: true;
    professionalId?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    slotDurationMinutes?: true;
    breakDurationMinutes?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AvailabilityMaxAggregateInputType = {
    id?: true;
    professionalId?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    slotDurationMinutes?: true;
    breakDurationMinutes?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AvailabilityCountAggregateInputType = {
    id?: true;
    professionalId?: true;
    dayOfWeek?: true;
    startTime?: true;
    endTime?: true;
    slotDurationMinutes?: true;
    breakDurationMinutes?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AvailabilityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilityWhereInput;
    orderBy?: Prisma.AvailabilityOrderByWithRelationInput | Prisma.AvailabilityOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AvailabilityCountAggregateInputType;
    _avg?: AvailabilityAvgAggregateInputType;
    _sum?: AvailabilitySumAggregateInputType;
    _min?: AvailabilityMinAggregateInputType;
    _max?: AvailabilityMaxAggregateInputType;
};
export type GetAvailabilityAggregateType<T extends AvailabilityAggregateArgs> = {
    [P in keyof T & keyof AggregateAvailability]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAvailability[P]> : Prisma.GetScalarType<T[P], AggregateAvailability[P]>;
};
export type AvailabilityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilityWhereInput;
    orderBy?: Prisma.AvailabilityOrderByWithAggregationInput | Prisma.AvailabilityOrderByWithAggregationInput[];
    by: Prisma.AvailabilityScalarFieldEnum[] | Prisma.AvailabilityScalarFieldEnum;
    having?: Prisma.AvailabilityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AvailabilityCountAggregateInputType | true;
    _avg?: AvailabilityAvgAggregateInputType;
    _sum?: AvailabilitySumAggregateInputType;
    _min?: AvailabilityMinAggregateInputType;
    _max?: AvailabilityMaxAggregateInputType;
};
export type AvailabilityGroupByOutputType = {
    id: string;
    professionalId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: AvailabilityCountAggregateOutputType | null;
    _avg: AvailabilityAvgAggregateOutputType | null;
    _sum: AvailabilitySumAggregateOutputType | null;
    _min: AvailabilityMinAggregateOutputType | null;
    _max: AvailabilityMaxAggregateOutputType | null;
};
export type GetAvailabilityGroupByPayload<T extends AvailabilityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AvailabilityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AvailabilityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AvailabilityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AvailabilityGroupByOutputType[P]>;
}>>;
export type AvailabilityWhereInput = {
    AND?: Prisma.AvailabilityWhereInput | Prisma.AvailabilityWhereInput[];
    OR?: Prisma.AvailabilityWhereInput[];
    NOT?: Prisma.AvailabilityWhereInput | Prisma.AvailabilityWhereInput[];
    id?: Prisma.StringFilter<"Availability"> | string;
    professionalId?: Prisma.StringFilter<"Availability"> | string;
    dayOfWeek?: Prisma.IntFilter<"Availability"> | number;
    startTime?: Prisma.StringFilter<"Availability"> | string;
    endTime?: Prisma.StringFilter<"Availability"> | string;
    slotDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    breakDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    isActive?: Prisma.BoolFilter<"Availability"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
};
export type AvailabilityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    professional?: Prisma.ProfessionalOrderByWithRelationInput;
};
export type AvailabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    professionalId_dayOfWeek?: Prisma.AvailabilityProfessionalIdDayOfWeekCompoundUniqueInput;
    AND?: Prisma.AvailabilityWhereInput | Prisma.AvailabilityWhereInput[];
    OR?: Prisma.AvailabilityWhereInput[];
    NOT?: Prisma.AvailabilityWhereInput | Prisma.AvailabilityWhereInput[];
    professionalId?: Prisma.StringFilter<"Availability"> | string;
    dayOfWeek?: Prisma.IntFilter<"Availability"> | number;
    startTime?: Prisma.StringFilter<"Availability"> | string;
    endTime?: Prisma.StringFilter<"Availability"> | string;
    slotDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    breakDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    isActive?: Prisma.BoolFilter<"Availability"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
    professional?: Prisma.XOR<Prisma.ProfessionalScalarRelationFilter, Prisma.ProfessionalWhereInput>;
}, "id" | "professionalId_dayOfWeek">;
export type AvailabilityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AvailabilityCountOrderByAggregateInput;
    _avg?: Prisma.AvailabilityAvgOrderByAggregateInput;
    _max?: Prisma.AvailabilityMaxOrderByAggregateInput;
    _min?: Prisma.AvailabilityMinOrderByAggregateInput;
    _sum?: Prisma.AvailabilitySumOrderByAggregateInput;
};
export type AvailabilityScalarWhereWithAggregatesInput = {
    AND?: Prisma.AvailabilityScalarWhereWithAggregatesInput | Prisma.AvailabilityScalarWhereWithAggregatesInput[];
    OR?: Prisma.AvailabilityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AvailabilityScalarWhereWithAggregatesInput | Prisma.AvailabilityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Availability"> | string;
    professionalId?: Prisma.StringWithAggregatesFilter<"Availability"> | string;
    dayOfWeek?: Prisma.IntWithAggregatesFilter<"Availability"> | number;
    startTime?: Prisma.StringWithAggregatesFilter<"Availability"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"Availability"> | string;
    slotDurationMinutes?: Prisma.IntWithAggregatesFilter<"Availability"> | number;
    breakDurationMinutes?: Prisma.IntWithAggregatesFilter<"Availability"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"Availability"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Availability"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Availability"> | Date | string;
};
export type AvailabilityCreateInput = {
    id?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    professional: Prisma.ProfessionalCreateNestedOneWithoutAvailabilitiesInput;
};
export type AvailabilityUncheckedCreateInput = {
    id?: string;
    professionalId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    professional?: Prisma.ProfessionalUpdateOneRequiredWithoutAvailabilitiesNestedInput;
};
export type AvailabilityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilityCreateManyInput = {
    id?: string;
    professionalId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    professionalId?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilityListRelationFilter = {
    every?: Prisma.AvailabilityWhereInput;
    some?: Prisma.AvailabilityWhereInput;
    none?: Prisma.AvailabilityWhereInput;
};
export type AvailabilityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AvailabilityProfessionalIdDayOfWeekCompoundUniqueInput = {
    professionalId: string;
    dayOfWeek: number;
};
export type AvailabilityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilityAvgOrderByAggregateInput = {
    dayOfWeek?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
};
export type AvailabilityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    professionalId?: Prisma.SortOrder;
    dayOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AvailabilitySumOrderByAggregateInput = {
    dayOfWeek?: Prisma.SortOrder;
    slotDurationMinutes?: Prisma.SortOrder;
    breakDurationMinutes?: Prisma.SortOrder;
};
export type AvailabilityCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput> | Prisma.AvailabilityCreateWithoutProfessionalInput[] | Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput | Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AvailabilityCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
};
export type AvailabilityUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput> | Prisma.AvailabilityCreateWithoutProfessionalInput[] | Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput | Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput[];
    createMany?: Prisma.AvailabilityCreateManyProfessionalInputEnvelope;
    connect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
};
export type AvailabilityUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput> | Prisma.AvailabilityCreateWithoutProfessionalInput[] | Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput | Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AvailabilityUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AvailabilityUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AvailabilityCreateManyProfessionalInputEnvelope;
    set?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    disconnect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    delete?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    connect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    update?: Prisma.AvailabilityUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AvailabilityUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AvailabilityUpdateManyWithWhereWithoutProfessionalInput | Prisma.AvailabilityUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AvailabilityScalarWhereInput | Prisma.AvailabilityScalarWhereInput[];
};
export type AvailabilityUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput> | Prisma.AvailabilityCreateWithoutProfessionalInput[] | Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput[];
    connectOrCreate?: Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput | Prisma.AvailabilityCreateOrConnectWithoutProfessionalInput[];
    upsert?: Prisma.AvailabilityUpsertWithWhereUniqueWithoutProfessionalInput | Prisma.AvailabilityUpsertWithWhereUniqueWithoutProfessionalInput[];
    createMany?: Prisma.AvailabilityCreateManyProfessionalInputEnvelope;
    set?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    disconnect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    delete?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    connect?: Prisma.AvailabilityWhereUniqueInput | Prisma.AvailabilityWhereUniqueInput[];
    update?: Prisma.AvailabilityUpdateWithWhereUniqueWithoutProfessionalInput | Prisma.AvailabilityUpdateWithWhereUniqueWithoutProfessionalInput[];
    updateMany?: Prisma.AvailabilityUpdateManyWithWhereWithoutProfessionalInput | Prisma.AvailabilityUpdateManyWithWhereWithoutProfessionalInput[];
    deleteMany?: Prisma.AvailabilityScalarWhereInput | Prisma.AvailabilityScalarWhereInput[];
};
export type AvailabilityCreateWithoutProfessionalInput = {
    id?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilityUncheckedCreateWithoutProfessionalInput = {
    id?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilityCreateOrConnectWithoutProfessionalInput = {
    where: Prisma.AvailabilityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput>;
};
export type AvailabilityCreateManyProfessionalInputEnvelope = {
    data: Prisma.AvailabilityCreateManyProfessionalInput | Prisma.AvailabilityCreateManyProfessionalInput[];
    skipDuplicates?: boolean;
};
export type AvailabilityUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AvailabilityWhereUniqueInput;
    update: Prisma.XOR<Prisma.AvailabilityUpdateWithoutProfessionalInput, Prisma.AvailabilityUncheckedUpdateWithoutProfessionalInput>;
    create: Prisma.XOR<Prisma.AvailabilityCreateWithoutProfessionalInput, Prisma.AvailabilityUncheckedCreateWithoutProfessionalInput>;
};
export type AvailabilityUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: Prisma.AvailabilityWhereUniqueInput;
    data: Prisma.XOR<Prisma.AvailabilityUpdateWithoutProfessionalInput, Prisma.AvailabilityUncheckedUpdateWithoutProfessionalInput>;
};
export type AvailabilityUpdateManyWithWhereWithoutProfessionalInput = {
    where: Prisma.AvailabilityScalarWhereInput;
    data: Prisma.XOR<Prisma.AvailabilityUpdateManyMutationInput, Prisma.AvailabilityUncheckedUpdateManyWithoutProfessionalInput>;
};
export type AvailabilityScalarWhereInput = {
    AND?: Prisma.AvailabilityScalarWhereInput | Prisma.AvailabilityScalarWhereInput[];
    OR?: Prisma.AvailabilityScalarWhereInput[];
    NOT?: Prisma.AvailabilityScalarWhereInput | Prisma.AvailabilityScalarWhereInput[];
    id?: Prisma.StringFilter<"Availability"> | string;
    professionalId?: Prisma.StringFilter<"Availability"> | string;
    dayOfWeek?: Prisma.IntFilter<"Availability"> | number;
    startTime?: Prisma.StringFilter<"Availability"> | string;
    endTime?: Prisma.StringFilter<"Availability"> | string;
    slotDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    breakDurationMinutes?: Prisma.IntFilter<"Availability"> | number;
    isActive?: Prisma.BoolFilter<"Availability"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Availability"> | Date | string;
};
export type AvailabilityCreateManyProfessionalInput = {
    id?: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    breakDurationMinutes?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AvailabilityUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilityUncheckedUpdateWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilityUncheckedUpdateManyWithoutProfessionalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dayOfWeek?: Prisma.IntFieldUpdateOperationsInput | number;
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    slotDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    breakDurationMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvailabilitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    slotDurationMinutes?: boolean;
    breakDurationMinutes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["availability"]>;
export type AvailabilitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    slotDurationMinutes?: boolean;
    breakDurationMinutes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["availability"]>;
export type AvailabilitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    professionalId?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    slotDurationMinutes?: boolean;
    breakDurationMinutes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["availability"]>;
export type AvailabilitySelectScalar = {
    id?: boolean;
    professionalId?: boolean;
    dayOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    slotDurationMinutes?: boolean;
    breakDurationMinutes?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AvailabilityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "professionalId" | "dayOfWeek" | "startTime" | "endTime" | "slotDurationMinutes" | "breakDurationMinutes" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["availability"]>;
export type AvailabilityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type AvailabilityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type AvailabilityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    professional?: boolean | Prisma.ProfessionalDefaultArgs<ExtArgs>;
};
export type $AvailabilityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Availability";
    objects: {
        professional: Prisma.$ProfessionalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        professionalId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        slotDurationMinutes: number;
        breakDurationMinutes: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["availability"]>;
    composites: {};
};
export type AvailabilityGetPayload<S extends boolean | null | undefined | AvailabilityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload, S>;
export type AvailabilityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AvailabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AvailabilityCountAggregateInputType | true;
};
export interface AvailabilityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Availability'];
        meta: {
            name: 'Availability';
        };
    };
    findUnique<T extends AvailabilityFindUniqueArgs>(args: Prisma.SelectSubset<T, AvailabilityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AvailabilityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AvailabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AvailabilityFindFirstArgs>(args?: Prisma.SelectSubset<T, AvailabilityFindFirstArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AvailabilityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AvailabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AvailabilityFindManyArgs>(args?: Prisma.SelectSubset<T, AvailabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AvailabilityCreateArgs>(args: Prisma.SelectSubset<T, AvailabilityCreateArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AvailabilityCreateManyArgs>(args?: Prisma.SelectSubset<T, AvailabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AvailabilityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AvailabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AvailabilityDeleteArgs>(args: Prisma.SelectSubset<T, AvailabilityDeleteArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AvailabilityUpdateArgs>(args: Prisma.SelectSubset<T, AvailabilityUpdateArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AvailabilityDeleteManyArgs>(args?: Prisma.SelectSubset<T, AvailabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AvailabilityUpdateManyArgs>(args: Prisma.SelectSubset<T, AvailabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AvailabilityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AvailabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AvailabilityUpsertArgs>(args: Prisma.SelectSubset<T, AvailabilityUpsertArgs<ExtArgs>>): Prisma.Prisma__AvailabilityClient<runtime.Types.Result.GetResult<Prisma.$AvailabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AvailabilityCountArgs>(args?: Prisma.Subset<T, AvailabilityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AvailabilityCountAggregateOutputType> : number>;
    aggregate<T extends AvailabilityAggregateArgs>(args: Prisma.Subset<T, AvailabilityAggregateArgs>): Prisma.PrismaPromise<GetAvailabilityAggregateType<T>>;
    groupBy<T extends AvailabilityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AvailabilityGroupByArgs['orderBy'];
    } : {
        orderBy?: AvailabilityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AvailabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvailabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AvailabilityFieldRefs;
}
export interface Prisma__AvailabilityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    professional<T extends Prisma.ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProfessionalDefaultArgs<ExtArgs>>): Prisma.Prisma__ProfessionalClient<runtime.Types.Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AvailabilityFieldRefs {
    readonly id: Prisma.FieldRef<"Availability", 'String'>;
    readonly professionalId: Prisma.FieldRef<"Availability", 'String'>;
    readonly dayOfWeek: Prisma.FieldRef<"Availability", 'Int'>;
    readonly startTime: Prisma.FieldRef<"Availability", 'String'>;
    readonly endTime: Prisma.FieldRef<"Availability", 'String'>;
    readonly slotDurationMinutes: Prisma.FieldRef<"Availability", 'Int'>;
    readonly breakDurationMinutes: Prisma.FieldRef<"Availability", 'Int'>;
    readonly isActive: Prisma.FieldRef<"Availability", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Availability", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Availability", 'DateTime'>;
}
export type AvailabilityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where: Prisma.AvailabilityWhereUniqueInput;
};
export type AvailabilityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where: Prisma.AvailabilityWhereUniqueInput;
};
export type AvailabilityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where?: Prisma.AvailabilityWhereInput;
    orderBy?: Prisma.AvailabilityOrderByWithRelationInput | Prisma.AvailabilityOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilityScalarFieldEnum | Prisma.AvailabilityScalarFieldEnum[];
};
export type AvailabilityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where?: Prisma.AvailabilityWhereInput;
    orderBy?: Prisma.AvailabilityOrderByWithRelationInput | Prisma.AvailabilityOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilityScalarFieldEnum | Prisma.AvailabilityScalarFieldEnum[];
};
export type AvailabilityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where?: Prisma.AvailabilityWhereInput;
    orderBy?: Prisma.AvailabilityOrderByWithRelationInput | Prisma.AvailabilityOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilityScalarFieldEnum | Prisma.AvailabilityScalarFieldEnum[];
};
export type AvailabilityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvailabilityCreateInput, Prisma.AvailabilityUncheckedCreateInput>;
};
export type AvailabilityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AvailabilityCreateManyInput | Prisma.AvailabilityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AvailabilityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    data: Prisma.AvailabilityCreateManyInput | Prisma.AvailabilityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AvailabilityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AvailabilityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvailabilityUpdateInput, Prisma.AvailabilityUncheckedUpdateInput>;
    where: Prisma.AvailabilityWhereUniqueInput;
};
export type AvailabilityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AvailabilityUpdateManyMutationInput, Prisma.AvailabilityUncheckedUpdateManyInput>;
    where?: Prisma.AvailabilityWhereInput;
    limit?: number;
};
export type AvailabilityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvailabilityUpdateManyMutationInput, Prisma.AvailabilityUncheckedUpdateManyInput>;
    where?: Prisma.AvailabilityWhereInput;
    limit?: number;
    include?: Prisma.AvailabilityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AvailabilityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where: Prisma.AvailabilityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvailabilityCreateInput, Prisma.AvailabilityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AvailabilityUpdateInput, Prisma.AvailabilityUncheckedUpdateInput>;
};
export type AvailabilityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
    where: Prisma.AvailabilityWhereUniqueInput;
};
export type AvailabilityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilityWhereInput;
    limit?: number;
};
export type AvailabilityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvailabilitySelect<ExtArgs> | null;
    omit?: Prisma.AvailabilityOmit<ExtArgs> | null;
    include?: Prisma.AvailabilityInclude<ExtArgs> | null;
};
