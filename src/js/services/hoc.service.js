export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

const hocService = {
    getDisplayName
};

export default hocService;