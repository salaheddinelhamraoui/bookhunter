export const COLORS = {
    primary: "#E6EED6",
    secondary: "#DDE2C6",
    dark: "#090C02",
    red: "#A72608",
    darkGray: "#BBC5AA",
    gray: "#F2F2F2",
    lightBlue: "#4ABFD9"
};

export const SIZES = {
    base: 10,
    small: 11,
    font: 12,
    medium: 13,
    extraMedium: 18,
    large: 24,
    extraLarge: 26,
    extraExtraLarge: 36,
};

export const FONTS = {
    bold: "GoldleafBoldPersonalUseBold",
};

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
};
