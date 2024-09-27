from django.core.exceptions import ValidationError

def validate_rating(value):
    acceptable_ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
    if value not in acceptable_ratings:
        raise ValidationError(f'Rating must be one of {acceptable_ratings}')
