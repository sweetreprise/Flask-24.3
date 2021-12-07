"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMG = "https://tinyurl.com/demo-cupcake"


def connect_db(app):
    """connects to database"""

    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake: contains id, flavor, size, rating, image"""

    __tablename__ = "cupcakes"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    flavor = db.Column(
        db.Text,
        nullable=False
    )

    size = db.Column(
        db.Text,
        nullable=False
    )

    rating = db.Column(
        db.Float,
        nullable=False
    )

    image = db.Column(
        db.Text,
        nullable=False,
        default=DEFAULT_IMG
    )