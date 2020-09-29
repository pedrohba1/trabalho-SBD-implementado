import * as Yup from 'yup';

const schema = Yup.object().shape({
  account: Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  }),
  location: Yup.object().shape({
    position: Yup.object().shape({
      type: Yup.string(),
      coordinates: Yup.array(),
    }),
  }),
});

class UserController {
  async store(req, res) {


  /*   if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'validation fail',
      });
    }
    const { email } = req.body.account;
    const { location } = req.body;

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({ error: 'this email is already in use' });
    }

    // create a location, and then assign it to the user.

    let user;
    if (location) {
      const createdLocation = await Location.create(location);
      user = await User.create({
        ...req.body.account,
        location_id: createdLocation.id,
      });
    } else {
      user = await User.create({
        ...req.body.account,
      });
    }
 */
    return res.json('teste');
  }

  async update(req, res) {
 /*    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'validation fails, invalid json',
      });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId); // the userId is inserted in the auth middleware

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userExists) {
        return res.status(400).json({
          error: 'user already exists',
        });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status('401').json({
        error: 'password does not match',
      });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    }); */

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
