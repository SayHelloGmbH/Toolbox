export const nowrap = {
    name: 'sht/nowrap',
    title: __('Nicht umbrechen', 'sha'),
    tagName: 'span',
    className: 'o-nowrap',
    attributes: {
        style: 'style',
    },
    edit({ isActive, value, onChange }) {
        const onToggle = () => {
            onChange(
                toggleFormat(value, {
                    type: 'sht/nowrap',
                    // attributes: {
                    //     style: 'white-space: nowrap;',
                    // },
                })
            );
        };
        return (
            <Fragment>
                <RichTextShortcut type='primary' character='w' onUse={onToggle} />
                <RichTextToolbarButton
                    icon={icon}
                    title={__('Nicht umbrechen', 'sha')}
                    onClick={onToggle}
                    isActive={isActive}
                    shortcutType='primary'
                    shortcutCharacter='w'
                />
            </Fragment>
        );
    },
};

function registerFormats() {
    [nowrap].forEach(({ name, ...settings }) => registerFormatType(name, settings));
}
registerFormats();
