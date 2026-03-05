using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    // Common Navigation
    public void LoadModeSelection() => SceneManager.LoadScene("01_ModeSel");

    // Patient Path
    public void LoadPatientHome() => SceneManager.LoadScene("10_PatientHome");
    public void LoadDailyEntry() => SceneManager.LoadScene("11_DailyEntry");
    public void LoadReminisce() => SceneManager.LoadScene("13_Reminisce");

    // Caretaker Path
    public void LoadCaretakerLogin() => SceneManager.LoadScene("20_CaretakerLogin");
    public void LoadCaretakerHome() => SceneManager.LoadScene("21_CaretakerHome");
    public void LoadCaretakerSettings() => SceneManager.LoadScene("22_CaretakerSettings");

    // Back Button Logic
    public void GoBack()
    {
        int currentIndex = SceneManager.GetActiveScene().buildIndex;
        SceneManager.LoadScene(currentIndex - 1);
    }
}
