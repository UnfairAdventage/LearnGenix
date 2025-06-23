from app.core.supabase import get_supabase

# Mapea títulos de ejercicios a UUIDs de materias
EXERCISE_SUBJECT_MAP = {
    'Ecuación Lineal Simple': '783c2b32-d13a-4f12-83fb-ec983c5160b0',  # Matemáticas
    'Sistema de Ecuaciones': '783c2b32-d13a-4f12-83fb-ec983c5160b0',  # Matemáticas
    'Concordancia Verbal': '8ac815ff-fbbb-4703-bdb5-6dcbbd8a0c46',    # Lenguaje
    'Ley de Newton': 'b1b32ccd-dc56-4420-88bc-f13795b9364b',          # Ciencias
}

def update_subject_ids():
    supabase = get_supabase()
    for title, subject_id in EXERCISE_SUBJECT_MAP.items():
        resp = supabase.table('exercises').update({'subject_id': subject_id}).eq('title', title).execute()
        print(f"Actualizado '{title}' -> subject_id: {subject_id} | Filas modificadas: {len(resp.data) if resp.data else 0}")

if __name__ == "__main__":
    update_subject_ids() 