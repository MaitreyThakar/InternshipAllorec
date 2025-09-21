# InternAI - Multi-Agent Allocation System

A comprehensive web application for intelligent internship allocation and recommendation using Gemini multi-agent AI system.

## Features

### 🎯 Core Functionality
- **Student Management**: Add, edit, and manage student profiles with skills, interests, and academic information
- **Company Management**: Manage company profiles with requirements, culture, and available positions
- **AI-Powered Allocation**: Multi-agent system for intelligent internship matching
- **Real-time Logs**: Monitor AI agent activities and decision-making process
- **Dashboard Analytics**: Comprehensive overview of the allocation system

### 🤖 AI Agents
The system includes 6 specialized AI agents powered by Gemini models:

1. **Student Analyzer** (`gemini-2.5-pro`)
   - Analyzes student profiles, skills, and academic background
   - Provides personalized recommendations

2. **Company Matcher** (`gemini-2.5-pro`)
   - Matches students with company requirements and culture
   - Evaluates compatibility scores

3. **Allocation Optimizer** (`gemini-2.5-pro`)
   - Creates optimal internship assignments using constraint satisfaction
   - Handles complex optimization algorithms

4. **Conflict Resolver** (`gemini-2.5-pro`)
   - Handles conflicts and ensures fair allocation
   - Resolves competing interests

5. **Recommendation Engine** (`gemini-2.5-flash`)
   - Provides personalized internship recommendations
   - Suggests best-fit opportunities

6. **Quality Assessor** (`gemini-2.5-flash`)
   - Evaluates the quality of proposed allocations
   - Ensures optimal matching

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Gemini AI integration

### Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Configure** Gemini API key in `script.js` (line 456)

### Gemini API Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace `'your-gemini-api-key'` in `script.js` with your actual API key
3. The system will automatically use the API for AI-powered features

## Usage

### Dashboard
- View system overview and key metrics
- Monitor recent AI activity
- Track allocation status

### Students
- Add new students with detailed profiles
- View student statistics (GPA, skills, interests)
- Edit or delete student records

### Companies
- Manage company profiles and requirements
- Track open positions and locations
- Monitor industry distribution

### AI Allocation
- Start intelligent allocation process
- Watch AI agents work in real-time
- View allocation results and match scores
- Optimize existing allocations

### AI Logs
- Monitor all AI agent activities
- Filter logs by agent or status
- Export logs to CSV
- Search through log history

## File Structure

```
InternAI/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Features in Detail

### Student Management
- **Profile Creation**: Name, email, major, year, GPA
- **Skills Tracking**: Comma-separated skills list
- **Interests Management**: Student preferences and interests
- **Statistics**: Automatic calculation of average GPA and high performers

### Company Management
- **Company Profiles**: Name, industry, location, size
- **Position Tracking**: Number of open positions
- **Requirements**: Skills and qualifications needed
- **Culture**: Company values and work environment

### AI Allocation Process
1. **Student Analysis**: AI analyzes student profiles and capabilities
2. **Company Matching**: AI matches students with suitable companies
3. **Optimization**: AI creates optimal allocation using constraint satisfaction
4. **Conflict Resolution**: AI resolves any conflicts or overlaps
5. **Quality Assessment**: AI evaluates and improves allocation quality

### Real-time Monitoring
- **Live Status Updates**: See AI agents working in real-time
- **Activity Logs**: Detailed logs of all AI decisions
- **Performance Metrics**: Track success rates and processing times
- **Export Functionality**: Download logs for analysis

## Customization

### Adding New AI Agents
1. Add agent configuration in `script.js`
2. Update the agents grid in `index.html`
3. Implement agent logic in the `GeminiAIService` class

### Modifying UI
- Edit `styles.css` for visual changes
- Update `index.html` for layout modifications
- Modify `script.js` for functionality changes

### API Integration
- Replace mock implementations in `GeminiAIService` with actual API calls
- Add error handling and retry logic
- Implement rate limiting and caching

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the AI Logs page for error details
2. Review the browser console for JavaScript errors
3. Ensure your Gemini API key is correctly configured

## Future Enhancements

- [ ] Real-time collaboration features
- [ ] Advanced analytics and reporting
- [ ] Machine learning model training
- [ ] Mobile app development
- [ ] Integration with university systems
- [ ] Advanced matching algorithms
- [ ] Multi-language support

---

**InternAI** - Powered by Gemini Multi-Agent AI for intelligent internship allocation and recommendation.
