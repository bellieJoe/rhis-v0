import { Dialog } from "primereact/dialog"


export interface Field {
    label : string,
    value : any,
    type : "input" | 'date' | 'select' | 'checkbox'
    onChange : () => void
}

export interface FilterModalProps {
    visible: boolean,
    onHide: () => void,
    fields : Field[]
}

export const FilterModal = ({
    visible,
    onHide,
    fields
} : FilterModalProps) => {
    return (
        <>
            <Dialog
                visible={visible}
                onHide={onHide}
                header="Filter"
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '640px': '100vw' }}
                >
                    {
                        
                    }
            </Dialog>
        </>
    )
}