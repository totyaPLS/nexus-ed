import {FormControl, FormGroup} from "@angular/forms";

type ExtractControlProps<T, PartialMode extends boolean> = {
    [K in keyof T]: T[K] extends (FormControl<infer I> | undefined) ?
        (I extends FormControl ? ExtractFromControl<I, PartialMode> : I)
        : T[K] extends FormGroup<infer I> ? ExtractFromControl<I, PartialMode> : never;
};
export type ExtractFromControl<T, PartialMode extends boolean = false> =
    PartialMode extends true ? Partial<ExtractControlProps<T, PartialMode>> : ExtractControlProps<T, PartialMode>;
