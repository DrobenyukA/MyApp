const map = {
    userField: "w3",
    firstName: "ofa",
    lastName: "wea",
    fullName: "ig",
    email: "U3",
    avatarURL: "Paa",
    id: "Eea"
};

function mapUserFields(resp){
    const user = resp[map.userField];
    if (user){
        return {
            firstName: user[map.firstName],
            lastName: user[map.lastName],
            fullName: user[map.fullName],
            email: user[map.email],
            avatarURL: user[map.avatarURL],
            id: user[map.id]
        };
    }
    return resp;
}

const UserService = {
    mapUserFields
};

export default UserService;