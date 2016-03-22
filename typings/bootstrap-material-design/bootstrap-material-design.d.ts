interface JQueryStatic {
    material: Material
}

interface Material {
    /**
     *  Run all material commands.
     */
    init: () => void,

    /**
     *  Will apply ripples.js to the default elements.
     */
    ripples: () => void,
 
    /**
     *  Will enable the MD style to the text inputs, and other kind of inputs (number, email, file etc).
     */
    input: () => void,

    /**
     *  Will enable the MD style to the checkboxes.
     */
    checkbox: () => void,

    /**
     *  Will enable the MD style to the checkboxes.
     */
    radio: () => void
}