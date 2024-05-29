import {FormItem} from "@/app/components/form";
import {Container} from "@/app/components/container";
import {tFormItem} from "@/app/components/form/types";

type Props = {
    header: string,
    items: tFormItem[],
    onSubmit: (values: Record<string, any>) => void,
    loading: boolean
}
export const OTP_Wrapper = ({header, items, onSubmit, loading = false} : Props) => {
    return (
        <Container header={header}>
            <FormItem
                items={items}
                onSubmit={onSubmit}
                loading={loading}
            />
        </Container>
    )
}
