from app.crud.user_progress import create_user_progress
from app.schemas.user_progress import UserProgressCreate

def test_create_user_progress():
    user_id = "362f7331-107c-4f1c-8606-03f4d19e4dee"
    exercise_id = "130aca86-2552-48d7-adf6-bc023971d4f9"
    progress = UserProgressCreate(
        user_id=user_id,
        exercise_id=exercise_id,
        score=10,
        time_spent=30,
        answer="respuesta de prueba",
        is_correct=True
    )
    result = create_user_progress(progress)
    assert result is not None, "No se insertó el registro en user_progress"
    assert str(result.user_id) == user_id, f"user_id incorrecto: {result.user_id}"
    assert str(result.exercise_id) == exercise_id, f"exercise_id incorrecto: {result.exercise_id}"
    print("Registro insertado correctamente en user_progress:", result)

if __name__ == "__main__":
    test_create_user_progress() 