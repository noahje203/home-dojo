const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const is_user_or_staff = require("../../permissions/is_user_or_staff");

// @route   GET api/profile/:profile_id
// @desc    Get active profile profile
// @access  Private
router.get("/:profile_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.profile_id);

        if (!profile || !is_user_or_staff(profile, req.user)) {
            return res
                .status(400)
                .json({
                    msg:
                        "There is either no profile for this user or you do not have access"
                });
        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/profile
// @desc    Update a profile
// @access  Private
router.post(
    "/:profile_id",
    [
        auth,
        [
            check("first_name", "First name is required.")
                .not()
                .isEmpty(),
            check("last_name", "Last name is required.")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { first_name, last_name } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if (first_name) profileFields.first_name = first_name;
        if (last_name) profileFields.last_name = last_name;

        try {

            let profile = await Profile.findById(req.params.profile_id);
            if (profile || !is_user_or_staff(profile, req.user)) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                console.log('profile');
                return res.json(profile);
            }
            return res.json(400).send({error: {msg: "Profile does not exist or you do not have access"}})

        } catch (err) {
            console.error(err.message);
           return res.status(500).send("Server error");
        }
    }
);

// @route   POST api/profile
// @desc    Create a profile
// @access  Private
router.post(
    "/",
    [
        auth,
        [
            check("first_name", "First name is required.")
                .not()
                .isEmpty(),
            check("last_name", "Last name is required.")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { first_name, last_name } = req.body;

        const profileFields = {};
        profileFields.user = req.user.id;
        if (first_name) profileFields.first_name = first_name;
        if (last_name) profileFields.last_name = last_name;

        try {
            // Create
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);

        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
);



module.exports = router;
