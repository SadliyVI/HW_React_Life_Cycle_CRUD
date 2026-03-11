import React from 'react';

type NotesFormProps = {
    onAdd: (content: string) => void | Promise<void>;
    submitting: boolean;
};

type NotesFormState = {
    content: string;
    touched: boolean;
};

export default class NotesForm extends React.Component<NotesFormProps, NotesFormState> {
    state: NotesFormState = {
        content: '',
        touched: false,
    };

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ content: e.target.value });
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ touched: true });

        const trimmed = this.state.content.trim();
        if (!trimmed) return;

        await this.props.onAdd(trimmed);
        this.setState({ content: '', touched: false });
    };

    render(): React.ReactNode {
        const { submitting } = this.props;
        const { content, touched } = this.state;

        const isValid = content.trim().length > 0;
        const showError = touched && !isValid;

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <textarea
                        className="textarea"
                        placeholder="Введите текст заметки…"
                        value={content}
                        onChange={this.handleChange}
                        rows={5}
                        disabled={submitting}
                    />
                    {showError && <div className="field-error">Текст заметки не должен быть пустым.</div>}
                </div>

                <button className="send" type="submit" disabled={submitting || !isValid} aria-label="Добавить">
                    ➤
                </button>
            </form>
        );
    }
}